/**
 * Created by vikram on 1/11/15.
 */

var IMAGES = ["images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg", "images/5.png", "images/6.jpg", "images/7.jpg", "images/8.jpg", "images/9.jpg"];
var KEYWORDS = ["Warped", "Corners Lifting", "Raising", "Not Sticking", "Layer Separation", "Gap", "Thin", "Weak", "Wall Thickness", "Filament Squashed", "Flat", "Jagged", "Offset", "Tiered", "Stepped", "Jam", "Filament Stuck", "Discoloration"];

var printer = function () {


    this.build_images = function () {

        var images = [];
        for (var i = 0; i < IMAGES.length; i++) {
            images.push(new img(i, IMAGES[i]));
        }

        return images;


    };

    this.next = function () {
        this.state += 1;
    };

    this.prev = function () {
        this.state -= 1;
    };

    this.add_image = function (i, src) {
        this.images.push(new img(i, src));
    };

    this.add_word = function (i, src) {
        this.words.push(new keyword(i, src, true));
    };

    this.build_words = function () {
        var keywords = [];
        for (var i = 0; i < KEYWORDS.length; i++) {
            keywords.push(new keyword(i, KEYWORDS[i], false));

        }
        return keywords;
    };
    this.state = 1;
    this.images = this.build_images();
    this.words = this.build_words();
    this.selected_images = [];
    this.selected_words = [];

    this.update_select_images = function () {
        var images = [];
        for (var i = 0; i < this.images.length; i++) {
            if (this.images[i].selected == true)
                images.push(i);
        }
        this.selected_images = images;
    };

    this.update_select_words = function () {
        var images = [];
        for (var i = 0; i < this.words.length; i++) {
            if (this.words[i].selected == true)
                images.push(i);
        }
        this.selected_words = images;
    };

    this.clear_select_words = function () {
        var images = [];
        for (var i = 0; i < this.words.length; i++) {
            this.words[i].selected = false;
        }
        this.selected_words = images;
    };

    this.clear_select_images = function () {
        var images = [];
        for (var i = 0; i < this.images.length; i++) {
            this.images[i].selected = false;
        }
        this.selected_images = images;
    };

    this.select_image = function (index) {

        this.images[index].toggle();
        this.update_select_images();
    };

    this.select_word = function (index) {

        this.words[index].toggle();
        this.update_select_words();
    };

};

var img = function (id, src) {

    this.id = id;
    this.src = src;
    this.selected = false;
    this.toggle = function () {
        this.selected = !this.selected;
    }

};

var keyword = function (id, word, selected) {

    this.id = id;
    this.word = word;
    this.selected = selected;

    this.toggle = function () {
        this.selected = !this.selected;
    }


};

var myApp = angular.module('myApp', []);

myApp.controller('myCtrl', ['$scope', function ($scope) {
    $scope.printer = new printer();
    $scope.suggestions = [
        {
            title: 'Bed Adhesion Issue',
            description: 'The first layer of the filament is only partially sticking, or isn’t sticking at all to the printer bed',
            page: 'static/template1.html'
        },
        {
            title: 'Layer Separation Issue',
            description: 'The layer doesn’t bond to the layer below it and they start to separate',
            page: 'static/template2.html'
        },
        {
            title: 'Inconsistent Filament Thickness Issue',
            description: 'Some parts of the filament layer appear thinner or thicker than other parts',
            page: 'static/template3.html'
        },
        {
            title: 'Layer Height Issue',
            description: 'Entire layer is pushed flat against the print bed, creating a thin layer of filament',
            page: 'static/template3.html'
        },
        //    {title:'Offset Layer Issue',description:'Sections of the part appear to be offset and create a jagged pyramid effect', page: 'static/template3.html'},
        //     {title:'Jammed Print Head Issue',description:'The filament doesnt move when extruded or has jagged marks left in it', page: 'static/template3.html'}

    ];

    $scope.app = [];

    $scope.template = "";
    $scope.word = "";
    $scope.solutions = "all";

    $scope.allSolutions = function () {
        $scope.solutions = "all";
    };

    $scope.init = function () {
        $scope.printer = new printer();
        $scope.template = "";
        $scope.solutions = "all";
    };

    $scope.add_word = function (word) {

        if (word != "")
            $scope.printer.add_word(0, word);
        $scope.word = "";
    };

    $scope.showSolution = function (index) {
        $scope.printer.state = 4;
        $scope.solutions = "one";
        $scope.app = $scope.suggestions[index];
        $scope.template = $scope.suggestions[index].page;

    };
}]);

