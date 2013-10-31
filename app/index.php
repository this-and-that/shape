<!--
 -  This & That
 -  No. 1
 -  Shape
 -
 -
 -  Ken Frederick
 -  ken.frederick@gmx.de
 -
 -  http://kennethfrederick.de/
 -  http://blog.kennethfrederick.de/
 -
 -->


<!doctype html>
<!--[if lt IE 7]>			<html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>				<html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>				<html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--><html class="no-js"> <!--<![endif]-->
	<head>
		<!-- META -->
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="description" content="">



		<!-- MOBILE -->
		<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<meta name="format-detection" content="telephone=no" />
		<meta name="apple-mobile-web-app-title" content="This &amp; That">


		<!-- iOS DEVICE ICON -->
		<!-- iPhone & iPod Touch -->
		<link rel="apple-touch-icon-precomposed" sizes="57x57" href="images/application-icon-57x57.png" />
		<!-- iPad -->
		<link rel="apple-touch-icon-precomposed" sizes="72x72" href="images/application-icon-72x72.png" />
		<!-- Retina (Universal) -->
		<link rel="apple-touch-icon-precomposed" sizes="114x114" href="images/application-icon-114x114.png" />
		<link rel="apple-touch-icon-precomposed" sizes="144x144" href="images/application-icon-144x144.png" />


		<!-- iOS DEVICE STARTUP IMAGES -->
		<!-- iPhone & iPod Touch Portrait -->
		<!-- <link rel="apple-touch-startup-image" href="images/iphone_startup.png" media="screen and (max-device-width: 320px)" /> -->
		<!-- <link rel="apple-touch-startup-image" href="images/iphone_startup@2x.png" media="(max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2)" /> -->

		<!-- iPad -->
		<!-- <link rel="apple-touch-startup-image" href="images/ipad_startup_landscape.png" sizes="1024x748" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape)" /> -->
		<!-- <link rel="apple-touch-startup-image" href="images/ipad_startup_portrait.png" sizes="768x1004" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait)"/> -->

		<!-- iPad (Retina) -->
		<!-- <link rel="apple-touch-startup-image" href="images/ipad_startup_landscape@2x.png" media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)" /> -->
		<!-- <link rel="apple-touch-startup-image" href="images/ipad_startup_portrait@2x.png" media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" /> -->



		<title>This &amp; That</title>



		<!-- CSS -->
		<link rel="stylesheet" href="styles/main.css">
		<style>
		</style>




		<!-- JAVASCRIPT -->
		<!-- build:js scripts/vendor/jquery.js -->
		<!-- JQUERY -->
		<script type="text/javascript" src="bower_components/jquery/jquery.js"></script>
		<script type="text/javascript" src="scripts/jquery/jquery.tt-onepage-scroll.js"></script>
		<script type="text/javascript" src="bower_components/jQuery-Retina-Display-Plugin/jquery.retina.js"></script>
		<!-- endbuild -->


		<!-- build:js scripts/main.js -->
		<!-- MAIN -->
		<script type="text/javascript" src="scripts/main.js"></script>
		<script type="text/javascript" src="bower_components/kerning.js/kerning.js"></script>
		<!-- endbuild -->


		<!-- page specific -->
		<script type="text/javascript">
			// TODO: implement dynamic loading of article
			filename = null;


			// Baker callbacks
			function onLeftTap(articleIndex) {
				// alert( articleIndex );
			};
			function onRightTap(articleIndex) {
				// alert( articleIndex );
			};
			function onUpTap(articleIndex) {
				// alert( articleIndex );
			};
			function onDownTap(articleIndex) {
				// alert( articleIndex );
			};


			/*
			 *	There must be a cleaner way to deal with
			 *	visibility states for onLoad... onPage... etc.
			 */
			// initial state
			function onReady(pageIndex) {
			};


			// onepage-scroll callbacks
			// Article
			function onArticleLoad(pageIndex) {
			};
			function onBeforeArticlePage(pageIndex, nextIndex) {
			};
			function onAfterArticlePage(pageIndex) {
			};

			// Gallery
			function onGalleryLoad(pageIndex) {
			};
			function onBeforeGalleryPage(pageIndex, nextIndex) {
			};
			function onAfterGalleryPage(pageIndex) {
			};

		</script>



	</head>
	<body>


		<!-- ARTICLE CONTENT BEGIN -->
		<div class="article">

			<!-------------------------------------------------------------------------
			-
			-	Page 1
			-
			- ------------------------------------------------------------------------ -->
			<div class="page">

				<div class="row">
					<div class="col-sm-3 col-sm-offset-1">
						<br />
						<?php
							$blacklist = array('.', '..', 'index.php','.DS_Store','.htaccess','book.json','favicon.ico');

							// this could be optimized drastically
							// but for my purposes... it's fine
							if ($handle = opendir('./')) {
								// files
								echo "<div class=\"row-fluid\">";
								while (false !== ($file = readdir($handle))) {
									if (!in_array($file, $blacklist) && !is_dir($file)) {
										echo "<a href=\"$file\">$file</a><br />\n";
									}
								}
								echo "</div>";
								echo "<hr />";

								closedir($handle);
							}

							// if ($handle = opendir('./')) {
							// 	// folders
							// 	echo "<div class=\"row-fluid\">";
							// 	while (false !== ($file = readdir($handle))) {
							// 		if (!in_array($file, $blacklist) && is_dir($file)) {
							// 			echo "<a href=\"$file\">$file</a><br />\n";
							// 		}
							// 	}
							// 	echo "</div>";

							// 	closedir($handle);
							// }
						?>
					</div>
				</div>

			</div> <!-- end page -->

		</div> <!-- end article -->









		<!-- build:js scripts/vendor/bootstrap.js -->
		<!-- BOOTSTRAP -->
		<script type="text/javascript" src="bower_components/bootstrap/js/affix.js"></script>
		<script type="text/javascript" src="bower_components/bootstrap/js/alert.js"></script>
		<script type="text/javascript" src="bower_components/bootstrap/js/button.js"></script>
		<script type="text/javascript" src="bower_components/bootstrap/js/carousel.js"></script>
		<script type="text/javascript" src="bower_components/bootstrap/js/collapse.js"></script>
		<script type="text/javascript" src="bower_components/bootstrap/js/dropdown.js"></script>
		<script type="text/javascript" src="bower_components/bootstrap/js/modal.js"></script>
		<script type="text/javascript" src="bower_components/bootstrap/js/scrollspy.js"></script>
		<script type="text/javascript" src="bower_components/bootstrap/js/tab.js"></script>
		<script type="text/javascript" src="bower_components/bootstrap/js/tooltip.js"></script>
		<script type="text/javascript" src="bower_components/bootstrap/js/transition.js"></script>
		<script type="text/javascript" src="bower_components/bootstrap/js/popover.js"></script>
		<!-- endbuild -->


	</body>
</html>