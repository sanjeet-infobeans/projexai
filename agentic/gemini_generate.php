<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$prompt = isset($input['prompt']) ? trim($input['prompt']) : '';

if (!$prompt) {
    echo json_encode(['error' => 'No prompt provided.']);
    exit;
}

// Gemini API endpoint and key (replace with your actual key)
$api_key = 'AIzaSyDqGpbtovZGjHE57AXekQxQEymmnLrnNCg';
$endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' . $api_key;

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

$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

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

$result = json_decode($response, true);
$output = '';
if (isset($result['candidates'][0]['content']['parts'][0]['text'])) {
    $output = $result['candidates'][0]['content']['parts'][0]['text'];
    // Remove markdown bold, asterisks, and leading helping text
    $output = preg_replace('/\*\*(.*?)\*\*/s', '$1', $output); // Remove **bold**
    $output = preg_replace('/^\* /m', '', $output); // Remove leading asterisks for bullets
    $output = preg_replace('/^[-•] /m', '', $output); // Remove leading dashes or bullets
    $output = preg_replace('/^\s*Okay,? I[’\'`]ve analyzed.*?(?=\n|$)/im', '', $output); // Remove 'Okay, I've analyzed...'
    $output = preg_replace('/^\s*Here[’\'`]s a summary.*?(?=\n|$)/im', '', $output); // Remove 'Here's a summary...'
    $output = preg_replace('/^\s*Below (is|are).*?(?=\n|$)/im', '', $output); // Remove 'Below is/are...'
    $output = preg_replace('/^\s*Here (are|is).*?(?=\n|$)/im', '', $output); // Remove 'Here are/is...'
    $output = trim($output);
} else {
    $output = 'No response generated.';
}

echo json_encode(['result' => $output]); 