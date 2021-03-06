/* ng-FitText.js v1.0.4
 * https://github.com/patrickmarabeas/ng-FitText.js
 *
 * Original jQuery project: https://github.com/davatron5000/FitText.js
 *
 * Copyright 2013, Patrick Marabeas http://marabeas.io
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 * Date: 14/02/2014
 */

'use strict';

angular.module( 'ngFitText', [] )
.directive( 'fittext', [ function() {
	return {
		restrict: 'A',
		scope: true,
//		If the element is safe to transclude / template the following block can be used:
//		transclude: true,
//		replace: true,
//		template: function( element, attrs ) {
//			var tag = element[0].nodeName;
//			return "<"+tag+" data-ng-transclude data-ng-style='{fontSize:fontSize}'></"+tag+">";
//		},
		link: function( scope, element, attrs ) {
			scope.compressor = attrs.fittext || 1;
			scope.minFontSize = attrs.fittextMin || Number.NEGATIVE_INFINITY;
			scope.maxFontSize = attrs.fittextMax || Number.POSITIVE_INFINITY;

			var resizer = function() {
				scope.fontSize = Math.max(
					Math.min(
						element[0].offsetWidth / ( scope.compressor * 10 ),
						parseFloat( scope.maxFontSize )
					),
					parseFloat( scope.minFontSize )
				) + 'px';

//				The following line can be replaced with the above block of commented code for a more angular approach if
//				the element won't have multiple directives calling transclusion or templates on it, or the DOM isn't
//				being manipulated. Since I can't assume what this directive will be used in combination with - this
//				is the sure fire method:
				element[0].style.fontSize = scope.fontSize;
			}; resizer(); //required for tests to pass without Chrome test window being minimised (resource starved - i.e. document.ready completes)

			angular.element( document ).ready( function() {
				resizer();
			});

			angular.element( window ).bind( 'resize', function() {
				scope.$apply( resizer );
			});
		}
	}
}]);
