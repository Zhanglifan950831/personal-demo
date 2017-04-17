import angular from 'angular'
import angularRoute from 'angular-route'
import Directive from './directives'
import Service from './httpService'
export default angular.module('xishuApp', ['ngRoute','directives','service'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<index></index>' //首页
            })
            .when('/case', {
                template: '<case></case>' //案例
            })
            .when('/case/:id', {
                template: '<case-detail></case-detail>' //案例详情
            })
            .when('/designer', {
                template: '<designer></designer>' //设计师
            })
            .when('/designer/:id', {
                template: '<designer-detail></designer-detail>' //设计师详情
            })
            .when('/subject', {
                template: '<subject></subject>' //在施项目
            })
            .when('/news', {
                template: '<news></news>' //新闻资讯
            })
            .when('/about', {
                template: '<about></about>' //关于我们
            })
            .when('/xishuadmin/login', {
                template: '<admin-login></admin-login>' //后台管理登陆
            })
            .when('/xishuadmin', {
                template: '<admin-index></admin-index>' //后台管理
            })
            .otherwise({
                redirectTo: '/'
            })
    }])