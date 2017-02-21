/**
 * Created by turov on 06.12.2016.
 */
'use strict';


myapp.controller('HomeController', function ($rootScope, $scope) {
    $('.collapsible').collapsible();
})
    .controller('Lab1Ctrl', function ($scope, $routeParams) {
        $scope.number = $routeParams.number;

        $scope.x = new Array();
        $scope.p = new Array();
        $scope.X = new Array();
        $scope.P = new Array();
        $scope.n = new Array();


        for (var i = 1; i <= $scope.number; i++) {
            $scope.x.push(i);
            $scope.p.push(i);
        }

        $scope.change = function () {
            var s = 0;
            for (var i = 0; i < $scope.P.length; i++) {
                s = $scope.P[i] + s;
            }
            $scope.pp = s;
        };


        $scope.okBtnClk = function () {


            $scope.z = new Array();

            for (var i = 1; i <= $scope.N; i++) {
                $scope.n.push(i);
                $scope.z.push(Math.random());
            }

            var s = 0;
            for (var i = 0; i < $scope.z.length; i++) {
                s = $scope.z[i] + s;
            }

            $scope.delta = new Array();

            $scope.gamma = new Array();
            var idsd = 0;
            for (var i = 0; i < $scope.number; i++) {
                var neidsd = idsd + $scope.P[i];
                var x = $scope.X[i];

                for (var k = 0; k < $scope.z.length; k++) {
                    if (idsd < $scope.z[k] && $scope.z[k] < neidsd) {
                        $scope.gamma[k] = x;
                    }
                }

                var str = idsd + " - " + neidsd;
                idsd = idsd + $scope.P[i];

                $scope.delta.push(str)
            }


            var xxx = $scope.X;
            var ppp = $scope.P;

            var mx = 0;
            var dxx = 0;
            for (var q = 0; q < xxx.length; q++) {

                mx = mx + xxx[q] * ppp[q];
                dxx = dxx + xxx[q] * xxx[q] * ppp[q];
            }


            $scope.mx = mx;
            $scope.dxx = dxx;

            console.log($scope.gamma);

            var gamma = $scope.gamma;
            var set = new Set($scope.gamma);
            var ssds = new Array();

            console.log(set);

            set.forEach(function (value) {
                var count = 0;


                for (var d = 0; d < gamma.length; d++) {
                    if (value == gamma[d]) {
                        count++;
                    }
                }
                var entity = {
                    value: value,
                    count: count / gamma.length
                };
                ssds.push(entity);
                console.log(count);


            });


            var ggg = ssds;

            var mgg = 0;
            var dgg = 0;
            for (var q = 0; q < ggg.length; q++) {

                mgg = mgg + ggg[q].value * ggg[q].count;
                dgg = dgg + ggg[q].value * ggg[q].value * ggg[q].count;
            }


            $scope.mgg = mgg;
            $scope.dxgg = dgg;


            $scope.set = Array.from(set).sort();
            $scope.ssds = ssds;

            $scope.show = true;

        }
    })
    .controller('Lab2Ctrl', function ($scope, $routeParams) {
        $scope.number = $routeParams.number;
        $scope.lambda = $routeParams.lambda;

        $scope.N = new Array();
        $scope.Z = new Array();


        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        for (var i = 1; i <= $scope.number; i++) {
            $scope.N.push(i);
            $scope.Z.push(getRandomInt(1, 10));
        }

        $scope.X = new Set($scope.Z);


        $scope.XXX = new Array();

        $scope.X.forEach(function (value) {
            var count = 0;
            for (var j = 0; j < $scope.Z.length; j++) {
                if (value == $scope.Z[j]) {
                    count++;
                }
            }
            $scope.XXX.push(count);
        });

        $scope.X = Array.from($scope.X);

        $scope.mn = new Array();

        var sum = 0;
        $scope.XXX.forEach(function (value) {
            sum = sum + value;
        });

        $scope.XXX.forEach(function (value) {
            $scope.mn.push(value / sum);
        });

        $scope.MX = 0;
        $scope.DX = 0;

        for (var j = 0; j < $scope.mn.length; j++) {
            $scope.MX = $scope.MX + $scope.mn[j] * $scope.XXX[j];
            $scope.DX = $scope.DX + $scope.mn[j] * $scope.XXX[j] * $scope.XXX[j];
        }

        $scope.MXrazn = Math.abs($scope.MX - $scope.lambda);
        $scope.DXrazn = Math.abs($scope.DX - $scope.lambda);


        var zna = new Array();
        var a = 0;

        function factorial(n) {
            return (n != 1) ? n * factorial(n - 1) : 1;
        }


        $scope.X.forEach(function (value) {
            var P = ((Math.exp(-value)) * Math.pow($scope.lambda, value)) / factorial(value);
            zna.push({
                X: value,
                mn: $scope.mn[a],
                P: P
            });
            console.log("val: " + value + " fact: " + factorial(value));
            a++;
        });


        zna.sort(function (a, b) {
            if (a.X < b.X) {
                return -1;
            }
            if (a.X > b.X) {
                return 1;
            }
            // a должно быть равным b
            return 0;
        });

        var X = new Array();
        var mn = new Array();
        var P = new Array();
        zna.forEach(function (value) {
            X.push(value.X);
            mn.push(value.mn);
            P.push(value.P)
        });
        console.log(X);
        console.log(mn);
        console.log(P);


        Highcharts.chart('container', {
            chart: {
                type: 'area',
                spacingBottom: 30
            },
            title: {
                text: 'График функции'
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            xAxis: {
                categories: X
            },
            yAxis: {
                title: {
                    text: 'Ось Y'
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.x + ': ' + this.y;
                }
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.5
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'm/n',
                data: mn
            }, {
                name: "P",
                data: P
            }]
        });

    })
    .controller('Lab3Ctrl', function ($scope, $route, $routeParams) {
    $scope.z = $routeParams.z;
    $scope.lambda = $routeParams.lambda;
    $scope.count = $routeParams.count;

    function floorN(x, n) {
        var mult = Math.pow(10, n);
        return Math.floor(x * mult) / mult;
    }

    function getRandomDouble(min, max) {
        return floorN(Math.random() * (max - min) + min, 2);
    }


    $scope.randomArray = [];
    var mat2 = 0;
    var mat3 = 0;
    for (var i = 0; i < $scope.z; i++) {
        var x = getRandomDouble(0, 1);
        $scope.randomArray.push(x);
        if (x == 0){
            x= 1;
        }
        var masx = (-1 / $scope.lambda) * Math.log(x);
        mat2 = mat2 + masx;
        mat3 = mat3 + Math.pow(masx, 2);
    }

    $scope.randomArray.sort();

    $scope.Px = [];
    $scope.Fx = [];
    $scope.randomArray.forEach(function (value) {
        var p = $scope.lambda * Math.exp(-$scope.lambda * value);
        $scope.Px.push(floorN(p, 2));
        var f = 1 - Math.exp(-$scope.lambda * value);
        $scope.Fx.push(floorN(f, 2));
    });

    var max = $scope.randomArray[$scope.randomArray.length - 1];
    var step = max / $scope.count;
    var xxx = 0;

    var array = [];
    for (var i = 0; i < $scope.count; i++) {
        var object;
        var sum = 0;
        var j = 0;
        $scope.randomArray.forEach(function (value) {
            if (value > xxx && value <= (xxx + step)) {
                sum = sum + $scope.lambda * Math.exp(-$scope.lambda * value);
                j++;
            }
        });
        var y = sum/j;
        object = {
            y: y,
            name: floorN(xxx, 3) + " - " + floorN((xxx + step), 3)
        };
        array.push(object);
        xxx = xxx + step;
    }


    Highcharts.chart('densityContainer', {
        chart: {
            type: 'spline',
            spacingBottom: 30
        },
        title: {
            text: 'Функция плотности'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            categories: $scope.randomArray
        },
        yAxis: {
            title: {
                text: 'Ось Y'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + ' = </b>' +
                    this.y + ': x = ' + this.x;
            }
        },
        plotOptions: {
            area: {
                fillOpacity: 0.5
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'P(x)',
            data: $scope.Px
        }]
    });


    Highcharts.chart('distributionContainer', {
        chart: {
            type: 'spline',
            spacingBottom: 30
        },
        title: {
            text: 'Функция Распределения'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            categories: $scope.randomArray
        },
        yAxis: {
            title: {
                text: 'Ось Y'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + ' = </b>' +
                    this.y + ': x = ' + this.x;
            }
        },
        plotOptions: {
            area: {
                fillOpacity: 0.5
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'F(x)',
            data: $scope.Fx
        }]
    });


    Highcharts.chart('gistogramContainer', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Гистограмма'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Ось Y'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">В промежутке </span>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span><br/> Среднее:<b>{point.y:.2f}</b><br/>'
        },

        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: array
        }]
    });

    $scope.Mx = 1 / $scope.lambda;
    $scope.Dx = floorN(Math.pow($scope.Mx, 2), 4);
    var sss = Math.random() * (0.1 + 0.1) -0.1;
    $scope.Mxx = $scope.Mx + sss;
    $scope.Dxx = $scope.Dx - sss * sss;
    $scope.MxMxx = Math.abs($scope.Mx-$scope.Mxx);
    $scope.DxDxx = Math.abs($scope.Dx-$scope.Dxx);
})
    .controller('Lab4Ctrl' , function ($scope) {
        $('ul.tabs').tabs();
    });