/*!
 * simpleSlides 1.0.0-beta
 *
 * Simple slides plugin, needs to add extra HTML element manually.
 * Still in beta version, please use with caution.
 * @todo Add destroy function
 *
 * Joseph
 * MIT License
 *
*/

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.simpleSlides = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

    // helper
    function getCurrentStyle(obj, cssproperty, csspropertyNS) {
        if (obj.style[cssproperty]) {
            return obj.style[cssproperty];
        }

        if (obj.currentStyle) {
            return obj.currentStyle[cssproperty];
        } else if (document.defaultView.getComputedStyle(obj, null)) {
            var currentStyle = document.defaultView.getComputedStyle(obj, null);
            var value = currentStyle.getPropertyValue(csspropertyNS);
            if (!value) {
                value = currentStyle[cssproperty];
            }
            return value;
        } else if (window.getComputedStyle) {
            var currentStyle = window.getComputedStyle(obj, "");
            return currentStyle.getPropertyValue(csspropertyNS);
        }
    }

    var simpleSlides = function(el, option) {
        this.el = el; // container
        this.option = option || {};
        this.el.paddingWidth = parseInt(getCurrentStyle(this.el, '', 'padding-left'))
                            +  parseInt(getCurrentStyle(this.el, '', 'padding-right'));
        this.children = this.el.querySelectorAll(option.childSelector); // contents
        this.contentsWidth = 0; // contents width
        this.stepLength = option.stepLength ? option.stepLength : 350 ; // width to scroll every step
        this.distanceMoved = 0;
        this.arrowLeft = option.leftArrowElement;
        this.arrowRight = option.rightArrowElement;
        this.arrowState = [0, 0];

        if( !this.children.length ) return console.warn('No children, no slides!');

        this.init();
    }

    simpleSlides.prototype.updateArrowsUI = function() {
        this.arrowLeft.style.display = this.arrowState[0] ? 'block' : 'none';
        this.arrowRight.style.display = this.arrowState[1] ? 'block' : 'none';
    }

    simpleSlides.prototype.next = function() {
        if ( Math.abs(this.distanceMoved) + this.el.offsetWidth >= this.contentsWidth ) {
            this.distanceMoved = 0;
            this.arrowState = [0, 1];
        } else if ( this.contentsWidth - Math.abs(this.distanceMoved) - this.el.offsetWidth < this.stepLength ) {
            this.distanceMoved = (this.contentsWidth - this.el.offsetWidth + this.el.paddingWidth)*-1;
            this.arrowState = [1, 0];
        } else {
            this.distanceMoved = this.distanceMoved - this.stepLength;
            this.arrowState = [1, 1];
        }

        this.el.querySelector(this.option.wrapperSelctor).style.transform = 'translate3d('+this.distanceMoved+'px,0,0)';
        this.updateArrowsUI();
    }

    simpleSlides.prototype.prev = function() {
        if ( Math.abs(this.distanceMoved) == 0 ) {
            this.distanceMoved = (this.contentsWidth - this.el.offsetWidth)*-1;
            this.arrowState = [1, 0];
        } else if ( Math.abs(this.distanceMoved) < this.stepLength ) {
            this.distanceMoved = 0;
            this.arrowState = [0, 1];
        } else {
            this.distanceMoved = this.distanceMoved + this.stepLength;
            this.distanceMoved == 0 ? this.arrowState = [0, 1] : this.arrowState = [1, 1];
        }

        this.el.querySelector(this.option.wrapperSelctor).style.transform = 'translate3d('+this.distanceMoved+'px,0,0)';
        this.updateArrowsUI();
    }

    simpleSlides.prototype.init = function() {
        var self = this;
        var arrowLeft = self.arrowLeft;
        var arrowRight = self.arrowRight;

        for(var i = 0; i < this.children.length; i++) {
            this.contentsWidth += this.children[i].offsetWidth
                                + parseInt(getCurrentStyle(this.children[i], '', 'margin-left'))
                                + parseInt(getCurrentStyle(this.children[i], '', 'margin-right'));
        }

        if( this.contentsWidth <= this.el.offsetWidth ) {
            this.arrowState = [0, 0];
        }else {
            this.arrowState = [0, 1];
        }

        if (this.el.querySelector(this.option.wrapperSelctor)) {
            this.el.querySelector(this.option.wrapperSelctor).style.transition = 'transform .25s ease-in-out';
        }

        arrowLeft && arrowLeft.addEventListener('click', self.prev.bind(self));
        arrowRight && arrowRight.addEventListener('click', self.next.bind(self));
        this.updateArrowsUI();
        this.el.setAttribute('data-spslidesloaded', true);
    }

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return simpleSlides;
}));