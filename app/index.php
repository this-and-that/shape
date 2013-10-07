<!-- 
 -	This & That
 -	No. 1
 -	Shape
 -
 -
 -	Ken Frederick
 -	ken.frederick@gmx.de
 -
 -	http://kennethfrederick.de/
 -	http://blog.kennethfrederick.de/
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
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
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
		<!-- iPhone/iPod Touch Portrait	-->
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
		<script src="bower_components/jquery/jquery.js"></script>
		<script src="bower_components/jquery-mousewheel/jquery.mousewheel.js"></script>
		<script src="bower_components/Lettering.js/jquery.lettering.js"></script>
		<!-- endbuild -->

		<!-- page specific -->
		<script type="text/javascript">
		</script>



	</head>
	<body>


		<!-- ARTICLE CONTENT BEGIN -->
		<!-- SWIPE/PAGE TRANSITION CONTAINER BEGIN -->
		<div id="article-slider" class="article">
			<div class="swipe-wrap pages">


				<!-------------------------------------------------------------------------
				-
				-	Page 1
				-
				- ------------------------------------------------------------------------ -->
				<div class="page">

					<div class="container-fluid">
						<div class="row-fluid">
						
							<div class="span1">
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
					</div>

				</div> <!-- end page -->


			</div> <!-- end swipe-wrap/pages -->
		</div> <!-- end article/slider -->






		<!-- TOUCH TARGET -->
		<!-- <div id="touchTarget">&nbsp;</div> -->






		<!-- PAPER.js -->
		<!-- RASTERS -->
		<div id="paperjsRasters">
		</div>






		<!-- ANALTYICS -->
		<!--[if lt IE 7]>
			<p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
		<![endif]-->

		<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
		<script>
			var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
			(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
			g.src='//www.google-analytics.com/ga.js';
			s.parentNode.insertBefore(g,s)}(document,'script'));
		</script>






		<!-- build:js scripts/main.js -->
		<!-- MAIN -->
		<script src="bower_components/retina.js-js/src/retina.js"></script>
		<script src="bower_components/Swipe/swipe.js"></script>
		<script src="scripts/main.js"></script>
		<!-- endbuild -->


		<!-- build:js scripts/vendor/bootstrap.js -->
		<!-- BOOTSTRAP -->
		<script src="bower_components/bootstrap/js/bootstrap-affix.js"></script>
		<script src="bower_components/bootstrap/js/bootstrap-alert.js"></script>
		<script src="bower_components/bootstrap/js/bootstrap-dropdown.js"></script>
		<script src="bower_components/bootstrap/js/bootstrap-tooltip.js"></script>
		<script src="bower_components/bootstrap/js/bootstrap-modal.js"></script>
		<script src="bower_components/bootstrap/js/bootstrap-transition.js"></script>
		<script src="bower_components/bootstrap/js/bootstrap-button.js"></script>
		<script src="bower_components/bootstrap/js/bootstrap-popover.js"></script>
		<script src="bower_components/bootstrap/js/bootstrap-typeahead.js"></script>
		<script src="bower_components/bootstrap/js/bootstrap-carousel.js"></script>
		<script src="bower_components/bootstrap/js/bootstrap-scrollspy.js"></script>
		<script src="bower_components/bootstrap/js/bootstrap-collapse.js"></script>
		<script src="bower_components/bootstrap/js/bootstrap-tab.js"></script>
		<!-- endbuild -->


	</body>
</html>
	