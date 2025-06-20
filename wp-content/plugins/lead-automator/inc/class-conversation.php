<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class Conversation
{
    public function __construct()
    {
        add_filter( 'gettext', [ $this, 'conversation_metabox_title_callback' ], 10, 3 );
        add_action( 'rest_api_init', [ $this, 'add_conversation_rest_callback' ] );
        add_action( 'rest_api_init', [ $this, 'get_conversation_rest_callback' ] );
    }

    public function conversation_metabox_title_callback( $translated_text, $text, $domain ) {
        if ( is_admin() && get_post_type() === 'client_profile' ) {
            if ( $translated_text === 'Comments' ) return 'Conversations';
            if ( $translated_text === 'Add Comment' ) return 'Add Conversation Note';
        }
        return $translated_text;
    }


    public function add_conversation_rest_callback() {
        register_rest_route( 'client/v1', '/conversation', [
            'methods'  => 'POST',
            'callback' => [ $this, 'add_conversation_note' ],
            'permission_callback' => '__return_true', // allow unauthenticated requests
        ]);
    }

    function add_conversation_note( $request ) {
        $post_id = $request->get_param( 'post' );
        $content = $request->get_param( 'content' );
        $author_name = $request->get_param( 'author_name' );
        $author_email = $request->get_param( 'author_email' );

        // Custom header check
        $headers = $request->get_headers();
        $secret  = isset( $headers['x_conversation_secret'] ) ? $headers['x_conversation_secret'][0] : '';

        if ( $secret !== 'projexai-lead-conversation' ) {
            return new WP_Error( 'forbidden', 'Invalid header.', [ 'status' => 403 ] );
        }
        // Validate post
        if ( get_post_status( $post_id ) !== 'publish' || ! comments_open( $post_id ) ) {
            return new WP_Error( 'invalid_post', 'Invalid or closed post.', [ 'status' => 400 ] );
        }

        // Insert comment
        $comment_id = wp_insert_comment([
            'comment_post_ID' => $post_id,
            'comment_content' => $content,
            'comment_author'  => $author_name,
            'comment_author_email' => $author_email,
            'comment_approved' => 1,
        ]);

        if ( is_wp_error( $comment_id ) ) {
            return $comment_id;
        }

        return [ 'success' => true, 'conversation_id' => $comment_id ];
    }

    public function get_conversation_rest_callback() {
        register_rest_route( 'client/v1', '/conversations', [
            'methods'  => 'GET',
            'callback' => [ $this, 'get_custom_post_conversation' ],
            'permission_callback' => '__return_true', // Optional: make public
            'args'     => [
                'post_id' => [
                    'required' => true,
                    'type'     => 'integer',
                ],
            ],
        ]);
    }

    public function get_custom_post_conversation( $request ) {
        $post_id = $request->get_param( 'post_id' );

        // Validate post
        $post = get_post( $post_id );
        if ( ! $post ) {
            return new WP_Error( 'invalid_post', 'Post not found.', [ 'status' => 404 ] );
        }

        // Fetch comments
        $comments = get_comments([
            'post_id' => $post_id,
            'status'  => 'approve',
            'order'   => 'ASC',
        ]);

        if ( empty( $comments ) ) {
            return new WP_REST_Response([ 'message' => 'No conversation found.' ], 200);
        }

        // Format response
        $response = [];
        foreach ( $comments as $comment ) {
            $response[] = [
                'id'      => $comment->comment_ID,
                'author'  => $comment->comment_author,
                'email'   => $comment->comment_author_email,
                'content' => $comment->comment_content,
                'date'    => $comment->comment_date,
            ];
        }

        return new WP_REST_Response([
            'post_id'  => $post_id,
            'conversations' => $response,
        ], 200);
    }



}