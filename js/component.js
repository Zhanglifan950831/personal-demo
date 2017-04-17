import $ from 'jquery'
import slider from './slider'
import publicJs from './publicJs'
export default angular.module('xishuApp')
    .component('index', {
        templateUrl: 'templates/index.template.html',
        transclude: true,
        controller: ['$scope', 'httpService', '$location', function($scope, httpService, $location) {
            // httpService.GET('./php/test.php',{query:2})
            $scope.images = ['img/slider/city--1-min-min.jpg', 'img/slider/city--2-min-min.jpg', 'img/slider/city--3-min-min.jpg', 'img/slider/city--4-min-min.jpg', 'img/slider/city--5-min-min.jpg'];
            $scope.$on('ngRepeatFinished', function() {
                $(function() {
                    slider.init(5);
                })
            });
            httpService.GET('php/home.php', {}).then(function(info) {
                if (info.errCode == 0) {
                    $scope.designerList = info.data.designer;
                    $scope.caseList = info.data.cases;
                };
            });

            /*跳转至设计师页面*/
            $scope.goDesigner = function(id) {
                if (id) {
                    $location.path('/designer/' + id);
                    return;
                };
                $location.path('/designer')
            };
            /*跳转至案例页面*/
            $scope.goCases = function(id) {
                if (id) {
                    $location.path('/case/' + id);
                    return;
                };
                $location.path('/case')
            }
        }]
    })
    .component('case', {
        templateUrl: 'templates/case.template.html',
        transclude: true,
        controller: ['$scope', 'httpService', function($scope, httpService) {
            var param={};
            $scope.chosenIdx=0;
            // 获取案例
            var getCases = function(param) {
                httpService.GET('./php/getCases.php',param)
                    .then(function(info) {
                        if (info.errCode == 0) {
                            $scope.caseList = info.data;
                            $scope.pages = info.pages;
                        } else {
                            alert(info.msg);
                        }
                    })
            };
            param.page=1;
            getCases(param);
            
            // 获取页面数据
            $scope.getPageData = function(page) {
                param.page=page;
                getCases(param);
            }
            // 获取设计师信息
            httpService.GET('./php/getDesigner.php',{})
            .then(function(info){
                if (info.errCode==0) {
                    $scope.designers=info.data;
                    $scope.designers.unshift({desId:-1,desName:'全部'});
                };
            });

            // 选择设计师
            $scope.choose=function  (id,$index) {
                $scope.chosenIdx=$index;
                if (id==-1) {
                    delete param.id;
                }else{
                    param.id=id;
                };
                param.page=1;
                getCases(param);
            }

        }]
    })
    .component('caseDetail', {
        templateUrl: 'templates/caseDetail.template.html',
        transclude: true,
        controller: ['$scope', 'httpService', '$routeParams', function($scope, httpService, $routeParams) {
            $scope.a = 5;
            console.log($routeParams.id);
        }]
    })
    .component('designer', {
        templateUrl: 'templates/designer.template.html',
        transclude: true,
        controller: ['$scope', '$location', 'httpService', function($scope, $location, httpService) {
            $scope.designer = {};
            $scope.isShow = false;

            httpService.GET('./php/getDesigner.php', {}).then(function(info) {
                if (info.errCode == 0) {
                    $scope.designers = info.data;
                };
            });

            $scope.search = function() {
                httpService.GET('./php/getDesigner.php', $scope.designer).then(function(info) {
                    if (info.errCode == 0) {
                        $scope.isShow = true;
                        $scope.designers = info.data;
                    };
                });
            };

            $scope.withdraw = function() {
                $scope.isShow = false;
                $scope.designer.name = '';
                /*重新请求*/
                httpService.GET('./php/getDesigner.php', {}).then(function(info) {
                    if (info.errCode == 0) {
                        $scope.designers = info.data;
                    };
                });
            };

            $scope.goDetail = function(id) {
                $location.path('/designer/' + id);
            }
        }]
    })
    .component('designerDetail', {
        templateUrl: 'templates/designerDetail.template.html',
        transclude: true,
        controller: ['$scope', 'httpService', '$routeParams', function($scope, httpService, $routeParams) {
            // 获取设计师相关资料
            httpService.GET('./php/getDesigner.php', {
                id: $routeParams.id
            }).then(function(info) {
                if (info.errCode == 0) {
                    $scope.designer = info.data;
                };
            });

            // 获取设计师相关获奖情况
            httpService.GET('./php/getAwards.php', {
                id: $routeParams.id
            }).then(function(info) {
                if (info.errCode == 0) {
                    $scope.awardList = info.data;
                };
            });
        }]
    })
    .component('subject', {
        templateUrl: 'templates/subject.template.html',
        transclude: true,
        controller: ['$scope', 'httpService', '$routeParams', function($scope, httpService, $routeParams) {
            $scope.a = 5;

        }]
    })
    .component('news', {
        templateUrl: 'templates/news.template.html',
        transclude: true,
        controller: ['$scope', 'httpService', '$routeParams', function($scope, httpService, $routeParams) {
            $scope.a = 5;

        }]
    })
    .component('about', {
        templateUrl: 'templates/about.template.html',
        transclude: true,
        controller: ['$scope', 'httpService', '$routeParams', function($scope, httpService, $routeParams) {
            $scope.a = 5;

        }]
    })
    .component('adminLogin', {
        templateUrl: 'templates/adminLogin.template.html',
        transclude: true,
        controller: ['$scope', 'httpService', '$location', function($scope, httpService, $location) {
            $scope.user = {
                name: '',
                pwd: ''
            };
            httpService.POST('./php/test.php',{bbb:51});
            $scope.login = function() {
                if (publicJs.isEmpty($scope.user.name)) {
                    alert('用户名不能为空');
                    return false;
                };
                if (publicJs.isEmpty($scope.user.pwd)) {
                    alert('密码不能为空');
                    return false;
                };
                httpService.GET('php/login.php', $scope.user).then(function(info) {
                    if (info.errCode == 0) {
                        // 存储用户信息
                        publicJs.setLocalStore('xishuUserName', info.userName);
                        // 清空数据 
                        for (var key in $scope.user) {
                            $scope.user[key] = '';
                        };
                        $location.path('xishuadmin');
                    } else {
                        alert(info.msg);
                        $('input').val('');
                        $('input[type=text]').get(0).focus();
                        $scop.user.pwd = '';
                    };
                })
            }

        }]
    })
    .component('adminIndex', {
        templateUrl: 'templates/adminIndex.template.html',
        transclude: true,
        controller: ['$scope', 'httpService', '$location', function($scope, httpService, $location) {
            // 判断用户是否登陆,否则跳转至登陆页面
            if (publicJs.getLocalStore('xishuUserName') == "null") {
                $location.path('xishuadmin/login');
                return false;
            } else {
                $scope.userName = publicJs.getLocalStore('xishuUserName');
            }
            // 初始显示设计师
            $scope.type = "designer";
            // 登出
            $scope.logOut = function() {
                publicJs.removeStore('xishuUserName');
                $location.path('xishuadmin/login');
            };
            $scope.designer = {
                name: '',
                position: '',
                profession: '',
                concenpt: '',
                WorkingTime: '',
                company: '玺墅室内设计有限公司'
            };

            $scope.submitDesigner = function() {
                for (var key in $scope.designer) {
                    if (publicJs.isEmpty($scope.designer[key])) {
                        alert('请确认每项都填');
                        return false;
                    };
                };
            }

            $('#file').on('change', function() {
                // console.log(this.files[0]);
                var file = this.files[0];
                if (!/image\/\w+/.test(file.type)) {
                    alert("请上传图片！");
                    return false;
                };
                var fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = function(ev) {
                    document.getElementById('img').innerHTML += "<img src='" + this.result + "'>";
                    console.log(ev.target);
                }
                alert(0)
            })

        }]
    })