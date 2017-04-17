import $ from 'jquery'
export default angular.module('directives', [])
    .directive('pageHeader', [function() {
        return {
            scope: {
                chosen: '@chosenIdx'
            },
            restrict: 'E',
            template: `<nav class="navbar navbar-default nav-custom" role="navigation">
        <img class="img-responsive" src="img/header.jpg">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" style="padding:0;" href="#/"><img src="img/logo.jpg"></a>
        </div>

        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
                <li ng-class="{true:'active',false:''}[chosen==0]"><a href="#/">首页</a></li>
                <li ng-class="{true:'active',false:''}[chosen==1]"><a href="#/case">设计案例</a></li>
                <li ng-class="{true:'active',false:''}[chosen==2]"><a href="#/designer">设计团队</a></li>
                <li ng-class="{true:'active',false:''}[chosen==3]"><a href="#/subject">在施项目</a></li>
                <li ng-class="{true:'active',false:''}[chosen==4]"><a href="#/news">新闻资讯</a></li>
                <li ng-class="{true:'active',false:''}[chosen==5]"><a href="#/about">关于我们</a></li>
            </ul>
        </div>
    </div>
</nav>`,
            replace: true,
            link: function($scope, iElm, iAttrs, controller) {
                $(iElm).on('click', 'button', function(ev) {
                    $('.navbar-collapse').slideToggle();
                })
            }
        };
    }])
    .directive('onFinishRender', ['$timeout', function($timeout) {
        return {
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            link: function($scope, iElm, iAttrs, controller) {
                if ($scope.$last == true) {
                    $timeout(function() {
                        $scope.$emit('ngRepeatFinished');
                    });
                };
            }
        };
    }])
    .directive('pageHandler', ['$timeout', function($timeout) {
        return {
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            link: function($scope, iElm, iAttrs, controller) {
                $timeout(function() {
                    var pages = $scope.pages;
                    var html = '<li><a href="javascript:void(0)">首页</a></li>';
                    for (var i = 1; i <= pages; i++) {
                        html += '<li><a href="javascript:void(0)">' + i + '</a></li>';
                    };
                    html += '<li><a href="javascript:void(0)">尾页</a></li>';
                    iElm.html(html);

                    iElm.on('click', function(ev) {
                        var oEvent = event || ev;
                        switch (oEvent.target.innerHTML) {
                            case '首页':
                                $scope.getPageData(1);
                                break;
                            case '尾页':
                                $scope.getPageData(pages);
                                break;
                            default:
                                $scope.getPageData(oEvent.target.innerHTML);
                                break;
                        }
                    })
                }, 300);

            }
        };
    }]);