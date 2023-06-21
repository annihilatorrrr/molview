<?php
/**
 * This file is part of MolView (http://molview.org)
 * Copyright (c) 2014-2023 Herman Bergwerf
 */

include_once("php/Parsedown.php");
include_once("php/utility.php");

parse_str($_SERVER["QUERY_STRING"], $params);
$id = $params["id"];

$map = array(
	"readme" => "README.md",
	"changelog" => "CHANGELOG.md",
	"copyright" => "COPYRIGHT.md",
	"legal" => "LEGAL.md",
	"htmlcanvas" => "pages/htmlcanvas.md",
	"400" => "pages/400.md",
	"401" => "pages/401.md",
	"403" => "pages/403.md",
	"404" => "pages/404.md",
	"500" => "pages/500.md"
);

$titleMap = array(
	"readme" => "README",
	"changelog" => "Changelog",
	"copyright" => "Copyright",
	"legal" => "Legal",
	"htmlcanvas" => "No support",
	"400" => "Bad request",
	"401" => "Authorization required",
	"403" => "Forbidden",
	"404" => "Not found",
	"500" => "Internal server error"
);

$copyrightMap = array(
	"readme" => false,
	"changelog" => false,
	"copyright" => true,
	"legal" => true,
	"htmlcanvas" => false,
	"400" => false,
	"401" => false,
	"403" => false,
	"404" => false,
	"500" => false
);

$md = file_get_contents($map[$id]);
$renderer = new Parsedown();
?>

<!DOCTYPE html>
<html>
	<head>
		<base href="https://molview.org/">
		<meta charset="UTF-8" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width, user-scalable=no" />

		<?php echo "<title>".$titleMap[$id]."</title>"; ?>

		<link rel="shortcut icon" href="favicon-32x32.png" />
		<meta name="author" content="Herman Bergwerf" />

		<link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700" />
		<link type="text/css" rel="stylesheet" href="build/molview-page.min.css" />
	</head>
	<body>
		<div id="header">
		<img id="logo" src="img/logo.png" />
		<a id="return-to-molview" href="./">
			<img id="mark" src="img/mark.png" />
		</a>
		</div>
		<div id="content">
			<?php echo $renderer->text($md); ?>
		</div>
		<?php if($copyrightMap[$id]) echo '<div id="footer">Copyright &copy; 2014-2023 Herman Bergwerf</div>'; ?>
	</body>
</html>
