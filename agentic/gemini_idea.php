<?php
header('Content-Type: application/json');

// Get the technology from POST
$input = json_decode(file_get_contents('php://input'), true);
$technology = isset($input['technology']) ? $input['technology'] : '';

if (!$technology) {
    echo json_encode(['error' => 'No technology provided.']);
    exit;
}

// Gemini API endpoint and key (replace YOUR_GEMINI_API_KEY with your actual key)
$api_key = 'AIzaSyDqGpbtovZGjHE57AXekQxQEymmnLrnNCg';
$endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' . $api_key;

// Prepare the prompt
$prompt = "Suggest a unique and practical app idea that can be built using $technology. Provide a short description.";

// Prepare the request payload
$data = [
    'contents' => [
        [
            'parts' => [
                ['text' => $prompt]
            ]
        ]
    ]
];

// Initialize cURL
$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

// Execute the request
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo json_encode(['error' => 'Request error: ' . curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);

if ($http_code !== 200) {
    echo json_encode(['error' => 'Gemini API error. HTTP code: ' . $http_code]);
    exit;
}

// Parse Gemini response
$result = json_decode($response, true);
$idea = '';
if (isset($result['candidates'][0]['content']['parts'][0]['text'])) {
    $idea = $result['candidates'][0]['content']['parts'][0]['text'];
} else {
    $idea = 'No idea generated.';
}

echo json_encode(['idea' => $idea]); 