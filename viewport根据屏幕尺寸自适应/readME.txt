在webpack中的entry做一下修改，通过数组的方式加入viewport.js 
entry: ['./app/js/main.js', './app/js/viewport.js'],

同时要使用px2rem插件，配置px自动转rem，完成自适应

插件使用方法地址：https://www.npmjs.com/package/px2rem-loader

module下的配置

            rules:[
                {
                    test:/\.vue$/,
                    loader:'vue-loader'
                },
                {
                    test:/\.scss$/,
                    use: env.production ? ExtractTextPlugin.extract( // 生产环境执行css提取到一个文件中
                        {
                            fallback: {
                                loader: 'vue-style-loader',
                                options: {
                                    extractCSS: true // 表示将页面上的所有css都放到一个style标签内
                                }
                            },
                            use: [
                                {
                                    loader: 'css-loader',
                                },
                                {
                                    loader: 'px2rem-loader',
                                    // options here
                                    options: {
                                        remUni: 75,
                                        remPrecision: 8
                                    }
                                },
                                {
                                    loader: 'sass-loader'
                                }
                            ]

                        }
                    ) :  [
                            {
                                loader: 'vue-style-loader',
                            },
                            {
                                loader: 'css-loader',
                            },
                            {
                                loader: 'px2rem-loader',
                                // options here
                                options: {
                                    remUni: 75,
                                    remPrecision: 8
                                }
                            },
                            {
                                loader: 'sass-loader'
                            }
                        ]
                     ,
                    // loader:'vue-style-loader!css-loader!sass-loader' // webpack支持并行处理从右往左，先交给sass-loader然后给css-loader最后给style-loader
                }
            ]