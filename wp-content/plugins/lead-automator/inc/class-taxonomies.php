<?php

class LA_Taxonomies {

    public function __construct() {
        add_action( 'init', [ $this, 'register_technology_taxonomy' ] );
        add_action('rest_api_init', [ $this, 'register_rest_fields_callback' ]);
        add_filter('rest_post_dispatch', [$this, 'filter_rest_response'], 20, 3);
    }

    public function register_technology_taxonomy() {
        // Register Technologies
        register_taxonomy( 'technology', 'projects', array(
            'label'        => 'Technology',
            'hierarchical' => false,
            'public'       => true,
            'show_in_rest' => true,
            'show_ui'            => true, // ✅ SHOWS IN ADMIN MENU
            'show_admin_column'  => true, // ✅ Shows in table column for lead_proposal
            'rewrite'      => array( 'slug' => 'technology' ),
        ) );

        // Prefill Terms — run only once
        if ( ! get_option( 'tech_taxonomy_prefilled' ) ) {

            $technology_terms = self::technologies_and_skilsets();

            foreach ( $technology_terms as $term_key => $term ) {
                if ( ! term_exists( $term['label'], 'technology' ) ) {
                    if ( ! is_wp_error( $inserted = wp_insert_term( $term['label'], 'technology', [
                        'slug' => $term_key,
                    ] ) ) ) {
                        $term_id = $inserted['term_id'];
                        if ( ! empty( $term['skill_set'] ) && is_array( $term['skill_set'] ) ) {
                            $i = 1;
                            foreach ( $term['skill_set'] as $skill ) {
                                add_term_meta( $term_id, "{$term_key}_skill_{$i}", $skill, true );
                                $i++;
                            }
                        }
                    }
                }
            }

            // Mark as prefilled so this doesn’t run again
            update_option( 'tech_taxonomy_prefilled', true );
        }
    }

    public static function technologies_and_skilsets() {

        return [
            'artificial-intelligence-genai' => [
                'label' => 'Artificial Intelligence (AI) / Generative AI (GenAI)',
                'skill_set' => [
                    'Python',
                    'NumPy',
                    'Pandas',
                    'PyTorch',
                    'ML/DL',
                    'Keras',
                    'TensorFlow',
                    'NLP',
                    'spaCy',
                    'GPT',
                    'Prompt Engineering',
                    'MLOps',
                    'LLM Fine-tuning',
                    'Cloud AI platforms',
                    'SageMaker',
                    'Vertex AI'
                ]
            ],
            'digital-transformation' => [
                'label' => 'Digital Transformation',
                'skill_set' => [
                    'Enterprise Architecture',
                    'TOGAF',
                    'Agile/DevOps',
                    'Cloud Platforms',
                    'AWS',
                    'Azure',
                    'API & Microservices',
                    'Data Governance',
                    'CRM/ERP',
                    'Change Management'
                ]
            ],
            'product-engineering' => [
                'label' => 'Product Engineering',
                'skill_set' => [
                    // Removed duplicates: 'Full Stack Development', 'React', 'Node.js', 'Java'
                    'Full Stack Development',
                    'React',
                    'Angular',
                    'Vue.js',
                    'Node.js',
                    'Python',
                    'Java',
                    'Go',
                    'PHP',
                    'Ruby on Rails',
                    'UI/UX Design',
                    'Prototyping',
                    'Agile Methodologies',
                    'Full-stack Development',
                    '.NET',
                    'System Design',
                    'Agile/Scrum',
                    'API Design',
                    'CI/CD',
                    'QA/Testing',
                    'Scalability'
                ]
            ],
            'automation-devops' => [
                'label' => 'Automation & DevOps',
                'skill_set' => [
                    // Removed duplicates: 'CI/CD', 'Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'Prometheus', 'Grafana'
                    'CI/CD',
                    'Jenkins',
                    'GitHub Actions',
                    'Terraform',
                    'Docker',
                    'Kubernetes',
                    'Monitoring',
                    'Prometheus',
                    'Grafana',
                    'Scripting',
                    'Bash',
                    'PowerShell',
                    'Cloud Infrastructure',
                    'CI/CD Pipelines',
                    'Ansible',
                    'GitOps',
                    'Monitoring & Logging',
                    'ELK Stack',
                    'Infrastructure as Code (IaC)',
                    'Configuration Management'
                ]
            ],
            'managed-services' => [
                'label' => 'Managed Services',
                'skill_set' => [
                    // Removed duplicates: 'ITIL Framework', 'SLA Monitoring'
                    'ITIL',
                    'Service Desk',
                    'Incident Management',
                    'Change Management',
                    'Problem Management',
                    'Monitoring & Alerting',
                    'SLA Management',
                    'Cloud Management',
                    'AWS Managed Services',
                    'Azure Managed Services',
                    'ITIL Framework',
                    'RMM Tools',
                    'SLA Monitoring',
                    'Virtualization',
                    'VMware',
                    'Patch Management',
                    'Backup/DR',
                    'Network Troubleshooting'
                ]
            ],
            'data-consulting-transformation' => [
                'label' => 'Data Consulting and Data Transformation',
                'skill_set' => [
                    // Removed duplicates: 'Data Governance', 'Tableau', 'Power BI'
                    'ETL/ELT Tools',
                    'Talend',
                    'NiFi',
                    'SQL',
                    'Data Modeling',
                    'DWH',
                    'BigQuery',
                    'Snowflake',
                    'BI Tools',
                    'Power BI',
                    'Tableau',
                    'Data Governance',
                    'Cloud ETL Tools',
                    'Data Strategy',
                    'Data Warehousing',
                    'ETL Processes',
                    'Big Data Technologies',
                    'Hadoop',
                    'Spark',
                    'Data Visualization',
                    'SQL/NoSQL Databases',
                    'Data Quality Management'
                ]
            ],
            'blockchain-development' => [
                'label' => 'Blockchain Development',
                'skill_set' => [
                    // Removed duplicates: 'Solidity', 'Ethereum', 'Web3.js', 'Hyperledger', 'Smart Contracts', 'Token Standards', 'IPFS'
                    'Solidity',
                    'Ethereum',
                    'Smart Contracts',
                    'Web3.js',
                    'Truffle',
                    'Hardhat',
                    'Hyperledger',
                    'Polygon',
                    'Solana',
                    'Rust',
                    'IPFS',
                    'DApp Development',
                    'Token Standards (ERC-20, ERC-721)',
                    'Metamask Integration',
                    'Blockchain Security',
                    'Consensus Algorithms',
                    'Chainlink',
                    'DeFi Protocols',
                    'Wallet Integration',
                    'Security Auditing'
                ]
            ],
            'game-development' => [
                'label' => 'Game Development',
                'skill_set' => [
                    // Removed duplicates: 'Unity', 'Unreal', 'Blender', 'C#/C++', 'Shaders', 'Multiplayer Networking'
                    'Unity',
                    'Unreal Engine',
                    'C#',
                    'C++',
                    'Game Design',
                    '3D Modeling',
                    'Blender',
                    'Maya',
                    'Game Physics',
                    'Multiplayer Networking',
                    'Mobile Game Development',
                    'Shader Programming',
                    'Level Design',
                    'Animation',
                    'VR/AR Development',
                    'Game Engines',
                    'Unreal',
                    '3D Tools',
                    'C#/C++',
                    'Shaders',
                    'Cross-Platform Dev',
                    'Game Monetization'
                ]
            ],
            'ecommerce-platforms' => [
                'label' => 'E-commerce platforms',
                'skill_set' => [
                    // Removed duplicates: 'Shopify', 'WooCommerce', 'Payment Integration', 'SEO', 'Order/Inventory Management'
                    'Shopify',
                    'Magento',
                    'WooCommerce',
                    'BigCommerce',
                    'PrestaShop',
                    'OpenCart',
                    'Payment Gateway Integration',
                    'Order Management',
                    'Inventory Management',
                    'API Integration',
                    'Custom Theme Development',
                    'SEO for E-commerce',
                    'Cart Abandonment Solutions',
                    'Product Catalog Management',
                    'Platforms',
                    'Payment Integration',
                    'Stripe',
                    'PayPal',
                    'SEO',
                    'Order/Inventory Management',
                    'Plugin Dev',
                    'CRM Integration'
                ]
            ],
            'mobile-app-development' => [
                'label' => 'Mobile App Development',
                'skill_set' => [
                    // Removed duplicates: 'Swift', 'Kotlin', 'Flutter', 'React Native', 'API Integration', 'Mobile Testing'
                    'iOS Development',
                    'Android Development',
                    'React Native',
                    'Flutter',
                    'Swift',
                    'Kotlin',
                    'Objective-C',
                    'Java',
                    'Mobile UI/UX Design',
                    'App Store Deployment',
                    'Firebase',
                    'Push Notifications',
                    'Mobile Testing',
                    'Cross-platform Development',
                    'API Integration',
                    'Native',
                    'Cross-Platform',
                    'State Management',
                    'App Store Guidelines'
                ]
            ],
            'storage-virtualization' => [
                'label' => 'Storage & Virtualization (distributed storage systems, storage virtualization services)',
                'skill_set' => [
                    // Removed duplicates: 'NAS', 'SAN', 'Ceph', 'VMware vSAN'
                    'VMware vSAN',
                    'Nutanix',
                    'Ceph',
                    'Storage Area Network (SAN)',
                    'Network Attached Storage (NAS)',
                    'iSCSI',
                    'Fibre Channel',
                    'ZFS',
                    'Data Deduplication',
                    'Backup & Recovery',
                    'Storage Provisioning',
                    'Hyperconverged Infrastructure',
                    'Storage Security',
                    'Cloud Storage Integration',
                    'Storage Systems',
                    'Backup Strategies',
                    'RAID',
                    'iSCSI/Fibre Channel',
                    'Hypervisors',
                    'KVM',
                    'ESXi',
                    'Monitoring Tools'
                ]
            ],
            'network-integration-security' => [
                'label' => 'Network Integration & Security',
                'skill_set' => [
                    // Removed duplicates: 'IDS/IPS', 'VPN/Firewall', 'Cisco', 'Zero Trust'
                    'Firewall Configuration',
                    'VPN',
                    'Network Segmentation',
                    'Cisco Networking',
                    'Juniper',
                    'Network Monitoring',
                    'IDS/IPS',
                    'Wi-Fi Security',
                    'Zero Trust Security',
                    'Penetration Testing',
                    'Network Automation',
                    'Load Balancing',
                    'SSL/TLS',
                    'SIEM',
                    'Access Control',
                    'TCP/IP',
                    'Routing/Switching',
                    'VLANs',
                    'VPN/Firewall',
                    'FortiGate',
                    'Cisco',
                    'NAC',
                    'Network Security Standards',
                    'ISO',
                    'NIST'
                ]
            ],
            'server-storage-integration' => [
                'label' => 'Server and Storage integration',
                'skill_set' => [
                    // Removed duplicates: none found
                    'Server Virtualization',
                    'Hyper-V',
                    'VMware ESXi',
                    'RAID Configuration',
                    'SAN/NAS Integration',
                    'Backup Solutions',
                    'Disaster Recovery',
                    'Linux Server Administration',
                    'Windows Server',
                    'Storage Provisioning',
                    'Performance Tuning',
                    'Firmware Upgrades',
                    'Clustering',
                    'Monitoring Tools',
                    'Server Provisioning',
                    'Disk & RAID Configuration',
                    'Scripting',
                    'OS Setup',
                    'Linux/Windows',
                    'Hyperconvergence',
                    'LUN Masking',
                    'Capacity Planning'
                ]
            ],
            'data-warehouse-optimization' => [
                'label' => 'Data warehouse optimization',
                'skill_set' => [
                    // Removed duplicates: 'Star/Snowflake Modeling', 'Query Tuning', 'Indexing', 'OLAP'
                    'Data Modeling',
                    'ETL Optimization',
                    'Query Performance Tuning',
                    'Indexing Strategies',
                    'Partitioning',
                    'Data Lake Integration',
                    'Columnar Databases',
                    'Snowflake',
                    'Amazon Redshift',
                    'Google BigQuery',
                    'Data Pipeline Automation',
                    'Data Quality Assurance',
                    'Star/Snowflake Schema Design',
                    'OLAP Cubes',
                    'Data Archiving',
                    'Star/Snowflake Modeling',
                    'Query Tuning',
                    'Indexing',
                    'OLAP',
                    'SSAS',
                    'Synapse',
                    'Compression',
                    'Caching',
                    'Materialized Views',
                    'Query Monitoring'
                ]
            ],
        ];
    }

    public function register_rest_fields_callback() {
        register_rest_field('technology', 'skills', [
            'get_callback' => [ $this, 'get_technology_term_skills' ],
            'schema' => [
                'description' => 'List of skills from term meta',
                'type'        => 'array',
                'items'       => [ 'type' => 'string' ],
            ],
        ]);
    }

    public function get_technology_term_skills( $term ) {
        $term_id = $term['id'];
        $term_obj = get_term($term_id, 'technology');

        if (!$term_obj || is_wp_error($term_obj)) {
            return [];
        }

        $slug = $term_obj->slug;
        $all_meta = get_term_meta($term_id);
        $skills = [];

        foreach ($all_meta as $key => $values) {
            if (preg_match('/^' . preg_quote($slug) . '_skill_\d+$/', $key)) {
                $skills[$key] = $values[0]; // Assume one value per key
            }
        }

        return $skills;
    }

    public function filter_rest_response($response, $server, $request) {
        $data = $response->get_data();

        // Handle array of items or single item
        if (isset($data[0])) {
            foreach ($data as &$item) {
                unset($item['_links']);
            }
        } else {
            unset($data['_links']);
        }

        $response->set_data($data);
        return $response;
    }
}

new LA_Taxonomies();