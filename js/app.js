angular
    .module('carouselApp', ['ngTouch'])
    .controller('CarouselController', function($timeout) {
        let carousel = this;

        carousel.width  = 800;
        carousel.height = 500;
        carousel.current = 1;
        carousel.offset = -(carousel.width); //Start offset — first (non-fake slide)
        carousel.silentTransition = false;
        carousel.blockTransition = false;

        carousel.images = [
            { url:'img/1.jpg' },
            { url:'img/2.jpg' },
            { url:'img/3.jpg' },
            { url:'img/4.jpg' },
            { url:'img/5.jpg' },
            { url:'img/6.jpg' }
        ];

        carousel.paneWidth = carousel.width * (carousel.images.length + 2);

        carousel.move = (index) => {
            carousel.current = index;
            carousel.offset = -((carousel.current) * carousel.width);
        };

        carousel.shiftPrev = () => {
            if(carousel.blockTransition) { return; }

            carousel.blockTransition = true;
            if(carousel.current === 1) {

                carousel.move(0);
                $timeout(function () {
                    carousel.silentTransition = true;
                    carousel.move(carousel.images.length);

                    $timeout(function () {
                        carousel.silentTransition = false;
                        carousel.blockTransition = false;
                    }, 100);
                }, 750);
            } else {
                carousel.move(--carousel.current);
                carousel.blockTransition = false;
            }
        };

        carousel.shiftNext = () => {
            if(carousel.blockTransition) { return; }

            carousel.blockTransition = true;
            if(carousel.current === carousel.images.length) {

                carousel.move(carousel.images.length + 1);
                $timeout(function () {
                    carousel.silentTransition = true;
                    carousel.move(1);

                    $timeout(function () {
                        carousel.silentTransition = false;
                        carousel.blockTransition = false;
                    }, 100);
                }, 750);
            } else {
                carousel.move(++carousel.current);
                carousel.blockTransition = false;
            }
        };

        carousel.swipe = function($event) {
            console.log($event);
        };

        carousel.key = function($event) {
            //console.log($event.keyCode);
            if ($event.keyCode === 39)
                carousel.shiftNext();
            else if ($event.keyCode === 37)
                carousel.shiftPrev();
        };
    });

