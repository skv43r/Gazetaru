<?php
function page_title($url) {
        $fp = file_get_contents($url);
        if (!$fp)
            return null;

        $res = preg_match("/<h2.+>(.*)<\/h2>/siU", $fp, $title_matches);
        if (!$res)
            return null;

        // Clean up title: remove EOL's and excessive whitespace.
        $title = preg_replace('/\s+/', ' ', $title_matches[1]);
        $title = trim($title);
        return $title;
    }

$titles = [];
for ($i = 1; $i < 6; $i++) {
    $string = __DIR__ .'/../news'.$i.'.html';
    $title = page_title($string);
    $title_low = mb_strtolower($title);
    $query = mb_strtolower($_GET['q']);
    if(strpos($title_low,$query) !== FALSE)
        array_push($titles,['title' => $title,'url' => '/news'.$i.'.html']);
}
echo json_encode($titles,JSON_UNESCAPED_UNICODE);
