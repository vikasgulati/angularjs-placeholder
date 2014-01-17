angular.module('customPlaceholder', []).directive('placeholder', function(){
    //	cn-placeholder directive definition object
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            if (!Modernizr.placeholder) {
                //	setup the label overlay for input
                var computedStyle = window.getComputedStyle(elm[0], null),
                    leftPadding = computedStyle.getPropertyValue('padding-left'),
                    topPadding = computedStyle.getPropertyValue('padding-top'),
                    placeholderLabel = angular.element(elm.parent()
                            .css({'position':'relative'})
                            .prepend('<span>' + elm.attr('placeholder') + '</span>')
                            .find('span')[0])
                        .css({  'color':'#999',
                            'position':'absolute',
                            'top': topPadding,
                            'left':leftPadding}),
                    placeholderBindClick = function(){
                        placeholderLabel.bind('click', function(){
                            elm[0].focus();
                        });
                    };

                placeholderBindClick();

                //	removes the label overlay when a value is typed
                var elemPlaceHandlePlaceholder = function(){
                    if (elm.val() !== '') {
                        placeholderLabel.remove();
                    } else {
                        elm.parent().prepend(placeholderLabel);
                        placeholderBindClick();
                    }
                };

                scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                    elemPlaceHandlePlaceholder();
                });

                elm.bind('keyup keydown', function(){
                    elemPlaceHandlePlaceholder();
                });
            }
        }
    };
});