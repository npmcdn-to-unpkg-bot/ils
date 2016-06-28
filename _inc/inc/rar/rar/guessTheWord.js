$(document).ready(function () {
    // TOOLTIPS

    //--||--||--||--||--||--||--||--||--||
    //CONSTANTS
    var activeField = 1;
    var activeFieldSecond = 1;
    var imageUrl;
    var synonymsArray = [];
    //--||--||--||--||--||--||--||--||--||
    //INIT FUNCTIONS
    function initMain() {
        processData.reset()
    }

    //--||--||--||--||--||--||--||--||--||
    //UTILS FUNCTIONS
    $('.upArrow').click(function () {
        window.scrollBy(0, 200 - window.innerHeight)
    })

    $('.downArrow').click(function () {
        window.scrollBy(0, window.innerHeight - 200)
    })

    function resetInputs() {
        $('#cre0').val('');
        $('#cre1').val('');
        $('#cre2').val('');
        $('#cre3').val('');
        $('#cre4').val('');
        $('#cre5').val('');
        $('#spa0').text('');
        $('#spa1').text('');
        $('#spa2').text('');
        $('#spa3').text('');
        $('#spa4').text('');
        $('#spa5').text('');
    }

    $('#toggle-event').change(function () {
        if (activeField == 0) {
            activeField = 1;
        } else {
            activeField = 0;
        }
    })

    $('#toggle-event-second').change(function () {
        if (activeFieldSecond == 0) {
            activeFieldSecond = 1;
        } else {
            activeFieldSecond = 0;
        }
    })

    var processData = {
        setter: function (data) {
            this.mainData = data;
        },
        getter: function () {
            return this.mainData;
        },
        getterIndex: function (index) {
            return this.mainData[index];
        },
        setterCounter: function (data) {
            this.counter = data;
        },
        increaseCounter: function () {
            this.counter = this.counter + 1;
        },
        getterCounter: function () {
            return this.counter;
        },
        setterLimit: function (data) {
            this.limit = data;
        },
        getterLimit: function () {
            return this.mainData.length;
        },
        init: function (data) {
            this.setter(data);
            this.setterLimit(data.length)
            this.setterCounter(0)
        },
        nextValue: function () {
            this.increaseCounter()
            var ss = this.getterIndex()
            return ss
        },
        reset: function () {
            this.setterCounter(0)
            this.setterLimit(0)
            this.setter(null)
            synonymsArray = []
        }
    }

    function whichField() {
        console.log(1)
        if (activeField == 0) {
            return $('.mainWord').val()
        } else {
            return $('.secondWord').val()
        }
    }

    function addToSynonyms(data) {
        synonymsArray.push(data);
    }

    function randomWord() {
        var ss = allWords.length;
        var index = Math.floor(Math.random() * ss);
        return allWords[index];
    }
    //--||--||--||--||--||--||--||--||-|
    //SOCKET FUNCTIONS
    function submitSocket() {

    }

    function inputSocket(commandWord) {
        $('.' + commandWord).click(function () {
            var ss = whichField();
            resetInputs()
            socket = io.connect('//localhost:3100', {'forceNew': true});
            socket.on('socketError', function (error) {
                console.log(error)
            });
            socket.on(commandWord, function (data) {
                populate('cre', data[0]);
                populateSpan('spa', data[1]);
            });
            $.ajax({
                type: "POST",
                url: 'socks/' + commandWord,
                data: {query: ss}
            })
                .done(function (msg) {
                    notify()
                    setTimeout(function () {
                        socket.io.close();
                    }, 1000)
                });
        });
    }

    function textareaSocket(commandWord) {
        $('.' + commandWord).click(function () {
            var ss = whichField();
            initMain()
            socket = io.connect('//localhost:3100', {'forceNew': true});
            socket.on('socketError', function (error) {
                console.log(error)
            });
            socket.on(commandWord, function (data) {
                processData.setterCounter(0);
                processData.setter(data);
                populateTextarea(data)
            });
            $.ajax({
                type: "POST",
                url: 'socks/' + commandWord,
                data: {query: ss}
            })
                .done(function (msg) {
                    notify()
                    setTimeout(function () {
                        socket.io.close();
                    }, 1000)
                });
        });
    }

    function detoenSocket(postObject, callback) {
        socket = io.connect('//localhost:3100', {'forceNew': true});
        socket.on('socketError', function (error) {
            console.log(error)
        });
        socket.on('detoen', function (data) {
            console.log(data)
            callback(data)
            //$('#textareaTranslate').val(data)
        });
        $.ajax({
            type: "POST",
            url: "socks/detoen",
            data: postObject
        })
            .done(function (msg) {
                notify()
                setTimeout(function () {
                    socket.io.close();
                }, 1000)
            });
    }

    function textareaSocket2(socketWord, postObject) {
        initMain()
        socket = io.connect('//localhost:3100', {'forceNew': true});
        socket.on('socketError', function (error) {
            console.log(error)
        });
        socket.on(socketWord, function (data) {
            processData.setterCounter(0);
            processData.setter(data);
            populateTextarea(data)
        });
        $.ajax({
            type: "POST",
            url: "socks/" + socketWord,
            data: postObject
        })
            .done(function (msg) {
                notify()
                setTimeout(function () {
                    socket.io.close();
                }, 1000)
            });
    }

    function inputSocket2(socketWord, postObject) {
        socket = io.connect('//localhost:3100', {'forceNew': true});
        socket.on('socketError', function (error) {
            console.log(error)
        });
        socket.on(socketWord, function (data) {
            console.log(data)
            populate('cre', data[0]);
            populateSpan('spa', data[1]);
        });
        $.ajax({
            type: "POST",
            url: 'socks/' + socketWord,
            data: postObject
        })
            .done(function (msg) {
                notify()
                setTimeout(function () {
                    socket.io.close();
                }, 1000)
            });
    }

    function twitterSocket(postObject) {
        initMain()
        socket = io.connect('//localhost:3100', {'forceNew': true});
        socket.on('socketError', function (error) {
            console.log(error)
        });
        socket.on('twitter', function (data) {
            processData.setterCounter(0);
            processData.setter(data);
            populateTextarea(data)
        });
        $.ajax({
            type: "POST",
            url: "socks/twitter/text",
            data: postObject
        })
            .done(function (msg) {
                notify()
                setTimeout(function () {
                    socket.io.close();
                }, 1000)
            });
    }

    function googleSocket(postObject) {
        initMain()
        socket = io.connect('//localhost:3100', {'forceNew': true});
        socket.on('socketError', function (error) {
            console.log(error)
        });
        socket.on('google', function (data) {
            populate('cre', data)
        });
        socket.on('reversoDetoen', function (data) {
            processData.setterCounter(0);
            processData.setter(data);
            populateTextarea(data)
        });
        $.ajax({
            type: "POST",
            url: "socks/google",
            data: postObject
        })
            .done(function (msg) {
                notify()
                setTimeout(function () {
                    socket.io.close();
                }, 1000)
            });
    }

    function contextSocket(postObject) {
        socket = io.connect('//localhost:3100', {'forceNew': true});
        socket.on('socketError', function (error) {
            console.log(error)
        });
        socket.on('context', function (data) {
            populate('textarea', data, 4)
        });
        $.ajax({
            type: "POST",
            url: "socks/bing/context",
            data: postObject
        })
            .done(function (msg) {
                notify()
                setTimeout(function () {
                    socket.io.close();
                }, 1000)
            });
    }

    function entodeSocket(postObject) {
        socket = io.connect('//localhost:3100', {'forceNew': true});
        socket.on('socketError', function (error) {
            console.log(error)
        });
        socket.on('entode', function (data) {
            populate('cre', data[0])
            populateSpan('spa', data[1])
        });
        $.ajax({
            type: "POST",
            url: "socks/entode",
            data: postObject
        })
            .done(function (msg) {
                notify()
                setTimeout(function () {
                    socket.io.close();
                }, 1000)
            });
    }

    /*function synonymsSocket(postObject) {
        socket = io.connect('//localhost:3100', {'forceNew': true});
        socket.on('socketError', function (error) {
            console.log(error)
        });
        socket.on('synonyms', function (data) {
            console.log(data)
            populate('cre', data[0])
            populateSpan('spa', data[1])
        });
        $.ajax({
            type: "POST",
            url: "socks/synonyms",
            data: postObject
        })
            .done(function (msg) {
                notify()
                setTimeout(function () {
                    socket.io.close();
                }, 1000)
            });
    }*/

    function imagesSocket(postObject) {
        socket = io.connect('//localhost:3100', {'forceNew': true});
        socket.on('socketError', function (error) {
            console.log(error)
        });
        socket.on('bingImages', function (data) {
            console.log(3, typeof data)
            populateImages(data)
        });
        $.ajax({
            type: "POST",
            url: "socks/bing/images",
            data: postObject
        })
            .done(function (msg) {
                notify()
                setTimeout(function () {
                    socket.io.close();
                }, 1000)
            });
    }

    function reversoDetoenSocket(postObject) {
        socket = io.connect('//localhost:3100', {'forceNew': true});
        socket.on('socketError', function (error) {
            console.log(error)
        });
        socket.on('reverso/detoen', function (data) {
            populate('cre', data[0])
            console.log(data)
            populate(data)
        });
        $.ajax({
            type: "POST",
            url: "socks/reverso/detoen",
            data: postObject
        })
            .done(function (msg) {
                notify()
                setTimeout(function () {
                    socket.io.close();
                }, 1000)
            });
    }

    //--||--||--||--||--||--||--||--||--||
    //REFRESHING DOM FUNCTIONS
    function beInsert(asValue) {
        var indexFound;
        $('.willSave').each(function (index) {
            if ($(this).val().length > 0) {
                flag = false;
                indexFound = '#sav' + index
            }
        })
        $(indexFound).val(asValue)
    }

    function populate(identify, data, limitValue) {
        var limit = limitValue || 6;
        data.map(function (value, key) {
            if (key < limit) {
                var ss = '#' + identify + key;
                $(ss).val(value)
            }
        })
    }

    function populateTextarea() {
        var limit = 4;
        var start = processData.getterCounter()
        var end = processData.getterLimit()
        if (start + limit > end) {
            limit = end - start
        }
        for (i = 0; i < limit; i++) {
            var prev = processData.getterCounter()
            var ss = '#textarea' + i;
            var value = processData.getterIndex(prev)
            $(ss).val(value)
            processData.setterCounter(start + i + 1)
        }
    }

    function populateTextareaCommon(identifier, limit) {
        var start = processData.getterCounter()
        if (start - limit < 4) {
            limit = start - limit;
        }
        for (i = 0; i < limit; i++) {
            var prev = processData.getterCounter()
            var ss = '#' + identifier + i;
            var value = processData.getterIndex(prev)

            $(ss).val(value)
            processData.setterCounter(start + i + 1)
        }
    }

    function populateSpan(identify, data) {
        data.map(function (value, key) {
            if (key < 6) {
                var ss = '#' + identify + key;
                $(ss).text(value)
            }
        })
    }

    function populateImages(data) {
        data.map(function (value, key) {
            if (key < 8) {
                var ss = '#streamImage' + key;
                console.log(value, ss)
                $(ss).attr("src", value);
            }
        })
    }

    function notify(data) {
        var willShow = data || 'performed'
        $('.notification').text(willShow)
        setTimeout(function () {
            $('.notification').text('')
        }, 3000)
    }

    //--||--||--||--||--||--||--||--||--||
    //RECEIVING CLICKS FUNCTIONS
    $('.translateSingle').click(function () {
        var likeIdBefore = $(this)[0].id
        var likeId = likeIdBefore[likeIdBefore.length - 1]
        var likeValue = $('#sav' + likeId).val()
        detoenSocket({query: likeValue}, function (data) {
            $('#done' + likeId).val(data)
        })
    })

    $('.twitter').click(function () {
        var ss = whichField();
        twitterSocket({query: ss});
    });

    $('.google').click(function () {
        var ss = whichField();
        googleSocket({query: ss});
    });

    $('.context').click(function () {
        var ss = whichField();
        contextSocket({query: ss});
    });

    $('.suggest').click(function () {
        var ss = randomWord();
        $('.secondWord').val(ss)
    });

    $('.entode').click(function () {
        var ss = whichField();
        entodeSocket({query: ss});
    });

/*    $('.synonyms').click(function () {
        var ss = whichField();
        synonymsSocket({query: ss})
    });*/

    /*$('.synonymsPlus').click(function () {
     var ss = whichField();
     resetInputs()
     inputSocket('synonymsPlus', {query: ss})
     });*/

    $('.reset').click(function () {
        $('input[type=text]').each(function () {
            $(this).val('');
        })
        $('textarea').each(function () {
            $(this).val('');
        })
    });

    $('.next').click(function () {
        populateTextarea();
    });

    $('.bingImages').click(function () {
        var ss = whichField();
        imagesSocket({query: ss})
    });

   /* $('.reversoDetoen').click(function () {
        var ss = whichField();
        textareaSocket('reverso/detoen', {query: ss})
    });*/

    inputSocket('synonyms')
    inputSocket('synonymsPlus')
    inputSocket('examples')
    inputSocket('verbix')
    textareaSocket('reversoDetoen')
    textareaSocket('welt')

    $('.btnSs').click(function () {
        var ss = $(this);
        var ss1 = ss.attr('id')
        var likeId = '#cre' + ss1[ss1.length - 1]
        var asValue = $(likeId).val();
        beInsert(asValue)
    });

    $('.btnFirst').click(function () {
        var ss = $(this);
        var ss1 = ss.attr('id')
        var likeId = '#cre' + ss1[ss1.length - 1]
        var asValue = $(likeId).val();
        beInsert(asValue)
    });

    $('.btnSecond').click(function () {
        var ss = $(this);
        var ss1 = ss.attr('id')
        var likeId = '#cre' + ss1[ss1.length - 1]
        var asValue = $(likeId).val();
        if (activeFieldSecond == 0) {
            $('.mainWord').val(asValue);
        } else {
            addToSynonyms(asValue)
            $('.secondWord').val(asValue);
        }
    });

    $('.detoen').click(function () {
        var ss = whichField();
        detoenSocket({query: ss});
    });

    $('.submit').click(function () {
        var finalObj = {};
        //finalObj.question = $('#sav0').val()
        //finalObj.answer = $('#sav1').val()
        $.ajax({
            type: "POST",
            url: "http://localhost:3002/post/order",
            data: finalObj
        })
            .done(function (msg) {
                notify()
                resetInputs()
                console.log(msg);
            });
    });

    $("[id^=streamImage]").click(function () {
        var ss = $(this);
        var ss1 = ss.attr('id')
        var likeId = '#streamImage' + ss1[ss1.length - 1]
        var ss2 = $(likeId).attr('src')
        $('#mainImage').attr("src", ss2);
        imageUrl = ss2;
    })

});

var allWords = ['able', 'abnormal', 'absent', 'absolute', 'abstract', 'abundant', 'academic', 'acceptable', 'accessible', 'accurate', 'active', 'acute', 'addicted', 'adequate', 'aesthetic', 'afraid', 'aggressive', 'agile', 'agricultural', 'alert', 'alive', 'aloof', 'amber', 'ambiguous', 'ambitious', 'ample', 'angry', 'annual', 'anonymous', 'applied', 'appropriate', 'arbitrary', 'archaeological', 'arrogant', 'artificial', 'artistic', 'ashamed', 'asleep', 'assertive', 'astonishing', 'attractive', 'automatic', 'available', 'awake', 'aware', 'awful', 'awkward', 'bad', 'bad', 'bad', 'balanced', 'bald', 'bare', 'basic', 'beautiful', 'bitter', 'bitter', 'black', 'black', 'bland', 'blank', 'blind', 'blonde', 'bloody', 'bold', 'brave', 'broken', 'brown', 'bureaucratic', 'busy', 'capable', 'careful', 'cautious', 'central', 'certain', 'characteristic', 'charismatic', 'cheap', 'cheerful', 'childish', 'chronic', 'civic', 'civilian', 'classical', 'clean', 'clear', 'clear', 'close', 'close', 'closed', 'cold', 'cold', 'blind', 'colorful', 'comfortable', 'commercial', 'common', 'common', 'common', 'comparable', 'compatible', 'competent', 'competitive', 'complete', 'complex', 'comprehensive', 'concrete', 'confident', 'conscious', 'conservative', 'considerable', 'consistent', 'constant', 'constant', 'constitutional', 'constructive', 'content', 'continental', 'continuous', 'controversial', 'convenient', 'conventional', 'cool', 'cool', 'cooperative', 'corporate', 'critical', 'critical', 'critical', 'crude', 'crude', 'cruel', 'cultural', 'curious', 'current', 'cute', 'daily', 'dangerous', 'dark', 'dead', 'deadly', 'deaf', 'decisive', 'decorative', 'deep', 'definite', 'delicate', 'delicate', 'democratic', 'dependent', 'desirable', 'different', 'difficult', 'digital', 'diplomatic', 'direct', 'dirty', 'dirty', 'discreet', 'distant', 'distinct', 'domestic', 'domestic', 'dominant', 'dramatic', 'dry', 'due', 'dull', 'dull', 'dynamic', 'eager', 'early', 'easy', 'economic', 'educational', 'effective', 'efficient', 'electronic', 'elegant', 'eligible', 'articulate', 'emotional', 'empirical', 'empty', 'encouraging', 'enjoyable', 'enthusiastic', 'environmental', 'equal', 'essential', 'established', 'eternal', 'ethical', 'ethnic', 'even', 'even', 'exact', 'excited', 'exciting', 'exclusive', 'exotic', 'exotic', 'expected', 'expensive', 'experienced', 'experimental', 'explicit', 'express', 'external', 'extinct', 'extraordinary', 'fair', 'faithful', 'false', 'familiar', 'far', 'fashionable', 'fast', 'fastidious', 'fat', 'favorable', 'federal', 'feminine', 'financial', 'fine', 'finished', 'finished', 'first', 'first-hand', 'flat', 'flawed', 'flexible', 'foolish', 'formal', 'forward', 'fragrant', 'frank', 'free', 'free', 'free', 'frequent', 'fresh', 'fresh', 'friendly', 'frozen', 'full', 'full', 'a full-time%3:00:00::', 'functional', 'funny', 'general', 'generous', 'genetic', 'genuine', 'geological', 'glad', 'glorious', 'good', 'good', 'gradual', 'grand', 'graphic', 'graphic', 'grateful', 'great', 'great', 'green', 'gregarious', 'handy', 'happy', 'hard', 'harmful', 'harsh', 'healthy', 'heavy', 'helpful', 'helpless', 'high', 'hilarious', 'historical', 'holy', 'homosexual', 'honest', 'honorable', 'horizontal', 'hostile', 'hot', 'hot', 'huge', 'human', 'hungry', 'ignorant', 'illegal', 'immune', 'imperial', 'implicit', 'important', 'impossible', 'impressive', 'inadequate', 'inappropriate', 'incapable', 'incongruous', 'incredible', 'independent', 'indigenous', 'indirect', 'indoor', 'industrial', 'inevitable', 'infinite', 'influential', 'informal', 'inner', 'innocent', 'insufficient', 'integrated', 'intellectual', 'intense', 'interactive', 'interesting', 'intermediate', 'internal', 'international', 'invisible', 'irrelevant', 'jealous', 'joint', 'judicial', 'junior', 'just', 'kind', 'large', 'last', 'late', 'latest', 'lazy', 'left', 'legal', 'legislative', 'liberal', 'light', 'light', 'light', 'likely', 'limited', 'linear', 'liquid', 'literary', 'live', 'lively', 'logical', 'lonely', 'long', 'long', 'loose', 'lost', 'lost', 'loud', 'low', 'depressed', 'loyal', 'lucky', 'magnetic', 'main', 'major', 'major', 'manual', 'marine', 'married', 'mathematical', 'mature', 'mature', 'maximum', 'meaningful', 'mechanical', 'medieval', 'memorable', 'mental', 'a middle-class%3:00:00::', 'mild', 'military', 'minimum', 'minor', 'miserable', 'mobile', 'modern', 'modest', 'molecular', 'monstrous', 'monstrous', 'monthly', 'moral', 'moving', 'multiple', 'municipal', 'musical', 'mutual', 'narrow', 'narrow', 'national', 'native', 'necessary', 'negative', 'negative', 'nervous', 'nervous', 'neutral', 'new', 'new', 'nice', 'noble', 'noble', 'noisy', 'normal', 'notorious', 'nuclear', 'obese', 'objective', 'obscure', 'obvious', 'occupational', 'odd', 'offensive', 'offensive', 'official', 'old', 'open', 'open', 'operational', 'opposed', 'optimistic', 'optional', 'oral', 'ordinary', 'organic', 'original', 'orthodox', 'other', 'outer', 'outside', 'painful', 'parallel', 'paralyzed', 'parental', 'particular', 'particular', 'a part-time%3:00:00::', 'passionate', 'passive', 'past', 'patient', 'peaceful', 'perfect', 'permanent', 'persistent', 'personal', 'a petty%5:00:00:narrow-minded:00', 'philosophical', 'physical', 'plain', 'pleasant', 'polite', 'political', 'poor', 'popular', 'portable', 'positive', 'possible', 'powerful', 'practical', 'practical', 'precise', 'predictable', 'pregnant', 'premature', 'present', 'present', 'presidential', 'primary', 'private', 'privileged', 'productive', 'professional', 'profound', 'progressive', 'prolonged', 'proper', 'proportional', 'proud', 'provincial', 'public', 'pure', 'pure', 'qualified', 'quantitative', 'quiet', 'quiet', 'racial', 'random', 'rare', 'rational', 'raw', 'ready', 'real', 'real', 'realistic', 'reasonable', 'reckless', 'regional', 'regular', 'related', 'related', 'relative', 'relevant', 'reliable', 'religious', 'representative', 'resident', 'residential', 'respectable', 'responsible', 'restless', 'restricted', 'retired', 'revolutionary', 'rich', 'right', 'romantic', 'rotten', 'rotten', 'rough', 'round', 'rural', 'sacred', 'sad', 'safe', 'satisfactory', 'satisfied', 'scientific', 'seasonal', 'seasonal', 'secondary', 'secular', 'secure', 'senior', 'sensitive', 'separate', 'serious', 'sexual', 'shallow', 'shallow', 'sharp', 'short', 'short', 'shy', 'sick', 'similar', 'single', 'single', 'skilled', 'slippery', 'slow', 'small', 'smart', 'smooth', 'social', 'socialist', 'soft', 'soft', 'soft', 'solar', 'solid', 'solid', 'sophisticated', 'sound', 'sour', 'spatial', 'specified', 'spontaneous', 'square', 'stable', 'standard', 'statistical', 'steady', 'steep', 'sticky', 'muggy', 'still', 'straight', 'straight', 'strange', 'strategic', 'strict', 'strong', 'strong', 'strong', 'strong', 'structural', 'stubborn', 'stunning', 'stupid', 'subjective', 'subsequent', 'successful', 'sudden', 'sufficient', 'superior', 'supplementary', 'surprised', 'surprising', 'sweet', 'sympathetic', 'systematic', 'talented', 'talkative', 'tall', 'tasty', 'technical', 'temporary', 'tender', 'tender', 'tense', 'tense', 'terminal', 'thick', 'thick', 'thin', 'thirsty', 'thoughtful', 'tidy', 'tight', 'tired', 'tolerant', 'tough', 'tough', 'toxic', 'traditional', 'transparent', 'trivial', 'tropical', 'true', 'typical', 'ugly', 'ultimate', 'unanimous', 'unaware', 'uncomfortable', 'uneasy', 'unemployed', 'unexpected', 'unfair', 'unfortunate', 'uniform', 'unique', 'global', 'unlawful', 'unlike', 'unlikely', 'unpleasant', 'urban', 'useful', 'useless', 'usual', 'vacant', 'vague', 'vain', 'valid', 'valuable', 'varied', 'verbal', 'vertical', 'viable', 'vicious', 'vigorous', 'violent', 'visible', 'visual', 'vocational', 'voluntary', 'vulnerable', 'warm', 'warm', 'weak', 'weekly', 'welcome', 'well', 'wet', 'white', 'white', 'whole', 'wild', 'wild', 'wise', 'written', 'wrong', 'wrong', 'young', 'abbey', 'ability', 'abortion', 'absence', 'absorption', 'absorption', 'absorption', 'abuse', 'abuse', 'academy', 'accent', 'acceptance', 'access', 'access', 'accident', 'accident', 'account', 'account', 'accountant', 'accumulation', 'achievement', 'acid', 'acquaintance', 'acquaintance', 'acquisition', 'act', 'act', 'action', 'action', 'action', 'activity', 'addition', 'addition', 'address', 'administration', 'administrator', 'admiration', 'admission', 'admission', 'adoption', 'adult', 'advance', 'advantage', 'adventure', 'advertising', 'advice', 'adviser', 'advocate', 'affair', 'affinity', 'affinity', 'afternoon', 'age', 'old age', 'age', 'agency', 'agenda', 'agent', 'agent', 'agony', 'agreement', 'agriculture', 'aid', 'AIDS', 'air', 'aircraft', 'airline', 'airport', 'aisle', 'alarm', 'alarm', 'alarm', 'album', 'album', 'alcohol', 'allocation', 'allowance', 'ally', 'ally', 'altar', 'aluminium', 'amateur', 'ambiguity', 'ambition', 'ambulance', 'amendment', 'analogy', 'analysis', 'analyst', 'angel', 'anger', 'angle', 'angle', 'animal', 'ankle', 'anniversary', 'announcement', 'answer', 'ant', 'anticipation', 'anxiety', 'apathy', 'apology', 'apparatus', 'appeal', 'appeal', 'appearance', 'appendix', 'appendix', 'appetite', 'apple', 'applicant', 'application', 'application', 'appointment', 'approval', 'aquarium', 'arch', 'architecture', 'archive', 'area', 'arena', 'argument', 'arm', 'armchair', 'army', 'arrangement', 'arrow', 'arrow', 'art', 'article', 'artist', 'ash', 'aspect', 'assault', 'rape', 'assembly', 'assembly', 'assertion', 'assessment', 'assessment', 'asset', 'assignment', 'association', 'association', 'association', 'assumption', 'assurance', 'asylum', 'athlete', 'atmosphere', 'atmosphere', 'atom', 'attachment', 'attachment', 'attack', 'attack', 'attention', 'attic', 'attitude', 'attraction', 'attraction', 'attraction', 'auction', 'audience', 'auditor', 'aunt', 'authority', 'authority', 'autonomy', 'avenue', 'average', 'aviation', 'award', 'axis', 'baby', 'back', 'back', 'background', 'background', 'background', 'bacon', 'suitcase', 'bag', 'bail', 'balance', 'balance', 'balance', 'balcony', 'ball', 'ball', 'ball', 'ballet', 'balloon', 'ballot', 'ban', 'banana', 'band', 'band', 'band', 'band', 'bang', 'bank', 'bank', 'bankruptcy', 'banner', 'bar', 'bar', 'bar', 'bar', 'bark', 'barrel', 'barrel', 'barrier', 'base', 'base', 'base', 'baseball', 'basin', 'basis', 'basket', 'basketball', 'bat', 'bathtub', 'bathroom', 'battery', 'battery', 'battle', 'battlefield', 'bay', 'beach', 'beam', 'beam', 'bean', 'bear', 'beard', 'beat', 'bed', 'bed', 'bedroom', 'bee', 'beef', 'beer', 'beginning', 'behavior', 'belief', 'bell', 'belly', 'belt', 'bench', 'bench', 'beneficiary', 'benefit', 'benefit', 'berry', 'bet', 'Bible', 'motorcycle', 'bill', 'bill', 'bin', 'biography', 'biology', 'bird', 'birthday', 'biscuit', 'bishop', 'bitch', 'bitch', 'snack', 'bite', 'black', 'blackmail', 'blade', 'blade', 'blast', 'block', 'block', 'blood', 'bloodshed', 'blow', 'blow', 'blue', 'blue jean', 'board', 'board', 'board', 'boat', 'body', 'body', 'body', 'bolt', 'bolt', 'bomb', 'bomber', 'bomber', 'bond', 'bond', 'bond', 'bone', 'book', 'book', 'boom', 'boot', 'border', 'bottle', 'freighter', 'bottom', 'bow', 'bow', 'bowel', 'bowl', 'stadium', 'box', 'boy', 'bracket', 'bracket', 'brain', 'brain', 'brake', 'branch', 'brand', 'bread', 'break', 'break', 'breakdown', 'breakdown', 'breakfast', 'breast', 'breeze', 'brewery', 'brick', 'bride', 'bridge', 'broadcast', 'broccoli', 'bronze', 'brother', 'brother', 'brother', 'brush', 'bubble', 'bucket', 'budget', 'buffet', 'building', 'bulb', 'bulb', 'bullet', 'bulletin', 'bundle', 'bureaucracy', 'burial', 'burn', 'suntan', 'bus', 'bush', 'business', 'business', 'businessman', 'butter', 'butterfly', 'button', 'button', 'cabin', 'cabin', 'cabinet', 'cabinet', 'cable', 'cafe', 'cage', 'cake', 'calculation', 'calculation', 'calendar', 'calf', 'call', 'call', 'call', 'call', 'calorie', 'camera', 'camp', 'camp', 'camp', 'clique', 'campaign', 'safari', 'campaign', 'cancer', 'candidate', 'candle', 'cane', 'canvas', 'cap', 'cap', 'capital', 'capital', 'capital', 'capitalism', 'captain', 'car', 'carbon', 'card', 'card', 'card', 'card', 'card', 'care', 'care', 'care', 'concern', 'career', 'carpet', 'carriage', 'posture', 'mail carrier', 'carrot', 'cart', 'case', 'case', 'case', 'cash', 'cassette', 'cast', 'cast', 'castle', 'casualty', 'cat', 'catalogue', 'catch', 'category', 'cathedral', 'cattle', 'cause', 'cave', 'ceiling', 'ceiling', 'celebration', 'cell', 'cell', 'cell', 'cell phone', 'cellar', 'cemetery', 'censorship', 'census', 'center', 'center', 'center', 'century', 'cereal', 'ceremony', 'certificate', 'chain', 'necklace', 'chain', 'chair', 'chair', 'chalk', 'challenge', 'challenge', 'champagne', 'champion', 'chance', 'chance', 'chance', 'change', 'change', 'channel', 'channel', 'chaos', 'crevice', 'chapter', 'character', 'character', 'character', 'characteristic', 'charge', 'charge', 'charge', 'charity', 'charity', 'charm', 'chart', 'chart', 'charter', 'chauvinist', 'check', 'check', 'check', 'check', 'cheek', 'cheek', 'cheek', 'cheese', 'chemical', 'chemistry', 'cheque', 'cherry', 'chest', 'chest', 'chicken', 'chicken', 'chief', 'child', 'childhood', 'chimney', 'chin', 'chip', 'chip', 'chip', 'chocolate', 'choice', 'chord', 'chorus', 'church', 'cigarette', 'cinema', 'circle', 'circulation', 'circumstance', 'citizen', 'city', 'civilian', 'civilization', 'claim', 'claim', 'clash', 'class', 'class', 'classroom', 'corpse', 'clay', 'clearance', 'clerk', 'salesperson', 'climate', 'clinic', 'clock', 'clothes', 'cloud', 'club', 'club', 'club', 'club', 'clue', 'cluster', 'coach', 'coal', 'coalition', 'coast', 'coat', 'coat', 'code', 'code', 'coffee', 'coffin', 'coin', 'coincidence', 'cold', 'cold', 'collar', 'colleague', 'collection', 'college', 'colon', 'colon', 'colony', 'color', 'column', 'column', 'coma', 'combination', 'comedy', 'comet', 'comfort', 'comfort', 'comfort', 'command', 'command', 'comment', 'gossip', 'commerce', 'commission', 'commission', 'commitment', 'committee', 'communication', 'communist', 'community', 'compact', 'company', 'company', 'comparison', 'compartment', 'compensation', 'competence', 'competition', 'competition', 'compliance', 'complication', 'composer', 'compound', 'compromise', 'computer', 'computing', 'concentration', 'concentration', 'concept', 'conception', 'concern', 'concern', 'concert', 'concession', 'conclusion', 'concrete', 'condition', 'condition', 'terms', 'condition', 'conductor', 'conductor', 'conference', 'confession', 'confidence', 'conflict', 'conflict', 'confrontation', 'confusion', 'conglomerate', 'congress', 'connection', 'connection', 'connection', 'conscience', 'consciousness', 'consensus', 'conservation', 'consideration', 'consideration', 'conspiracy', 'constellation', 'constituency', 'constitution', 'constitution', 'constraint', 'consultation', 'consumer', 'consumption', 'contact', 'contact', 'contact', 'contemporary', 'contempt', 'content', 'contest', 'context', 'continuation', 'contract', 'contraction', 'contradiction', 'contrary', 'contrast', 'contribution', 'control', 'control', 'convenience', 'convention', 'convention', 'conversation', 'conviction', 'cook', 'cooperation', 'copper', 'copy', 'copyright', 'cord', 'core', 'corn', 'corner', 'corner', 'correction', 'correlation', 'correspondence', 'corruption', 'costume', 'cottage', 'cotton', 'council', 'counter', 'country', 'country', 'countryside', 'coup', 'couple', 'courage', 'course', 'course', 'course', 'court', 'court', 'court', 'courtesy', 'cousin', 'cover', 'cover', 'coverage', 'coverage', 'cow', 'wisecrack', 'crack', 'cunning', 'craft', 'craftsman', 'crash', 'crash', 'cream', 'cream', 'creation', 'credibility', 'credit', 'credit', 'credit', 'credit', 'credit card', 'creed', 'crew', 'cricket', 'crime', 'criminal', 'crisis', 'critic', 'criticism', 'crop', 'cross', 'cross', 'crosswalk', 'crossing', 'crowd', 'crown', 'cruelty', 'crutch', 'crystal', 'crystal', 'cucumber', 'culture', 'culture', 'culture', 'culture', 'cup', 'cup', 'cupboard', 'currency', 'current', 'curriculum', 'curtain', 'curve', 'curve', 'curve', 'cushion', 'custody', 'customer', 'snub', 'cut', 'cut', 'cut', 'cutting', 'cycle', 'cylinder', 'dairy', 'damage', 'danger', 'dark', 'date', 'date', 'date', 'date', 'daughter', 'day', 'daylight', 'deadline', 'deal', 'deal', 'dealer', 'death', 'debate', 'debt', 'decade', 'decay', 'decay', 'deck', 'deck', 'declaration', 'decoration', 'decrease', 'deer', 'default', 'nonremittal', 'defeat', 'defendant', 'deficiency', 'deficit', 'definition', 'degree', 'degree', 'degree', 'degree', 'delay', 'delegate', 'delivery', 'demand', 'demand', 'democracy', 'demonstration', 'demonstration', 'demonstrator', 'denial', 'density', 'dentist', 'departure', 'dependence', 'deposit', 'deposit', 'deposit', 'depression', 'depression', 'depression', 'depression', 'deprivation', 'deputy', 'descent', 'lineage', 'desert', 'design', 'design', 'architect', 'designer', 'designer', 'desire', 'desk', 'despair', 'destruction', 'detail', 'detective', 'detector', 'development', 'development', 'deviation', 'diagnosis', 'diagram', 'dialect', 'dialogue', 'dialogue', 'diameter', 'diamond', 'dictionary', 'diet', 'difference', 'difference', 'difficulty', 'difficulty', 'dignity', 'dilemma', 'dimension', 'dinner', 'diplomat', 'direction', 'direction', 'director', 'director', 'directory', 'disability', 'disadvantage', 'disagreement', 'disappointment', 'disaster', 'discipline', 'disco', 'discount', 'sermon', 'discovery', 'discrimination', 'disease', 'dish', 'dish', 'dish', 'disk', 'dismissal', 'disorder', 'display', 'disposition', 'distance', 'distance', 'distortion', 'distortion', 'distributor', 'district', 'disturbance', 'dividend', 'division', 'division', 'division', 'divorce', 'doctor', 'doctor', 'document', 'dog', 'hotdog', 'doll', 'dollar', 'dolphin', 'dome', 'domination', 'donor', 'door', 'dose', 'double', 'double', 'doubt', 'doubt', 'dough', 'dozen', 'draft', 'draft', 'draft', 'dragon', 'drain', 'drama', 'drawer', 'drawing', 'drawing', 'dream', 'dream', 'dressing', 'drift', 'drift', 'drill', 'drill', 'drunkenness', 'drink', 'drive', 'drive', 'drive', 'driver', 'drop', 'drop', 'drug', 'drum', 'drum', 'duck', 'duke', 'duration', 'dust', 'duty', 'duty', 'eagle', 'eagle', 'ear', 'earthquake', 'east', 'east', 'echo', 'economics', 'economist', 'economy', 'economy', 'edge', 'edge', 'edition', 'education', 'education', 'effect', 'effect', 'effort', 'egg', 'ego', 'elbow', 'election', 'electorate', 'electricity', 'electron', 'electronics', 'element', 'element', 'elephant', 'elite', 'embarrassment', 'embassy', 'embryo', 'emergency', 'emotion', 'emphasis', 'empire', 'employee', 'employer', 'employment', 'end', 'end', 'end', 'enemy', 'energy', 'engagement', 'engine', 'engine', 'engineer', 'entertainment', 'enthusiasm', 'entitlement', 'entry', 'entry', 'envelope', 'environment', 'episode', 'equation', 'equilibrium', 'equipment', 'era', 'erosion', 'error', 'error', 'essay', 'perfume', 'estate', 'estimate', 'estimate', 'estimate', 'estimate', 'ethics', 'Europe', 'evening', 'evolution', 'examination', 'example', 'example', 'excavation', 'exception', 'excess', 'exchange', 'exchange', 'excitement', 'excitement', 'excuse', 'execution', 'executive', 'executive', 'exemption', 'exercise', 'exhibition', 'exile', 'exit', 'expansion', 'expectation', 'expedition', 'expenditure', 'experience', 'experiment', 'expert', 'expertise', 'explanation', 'exploration', 'explosion', 'exposure', 'expression', 'extension', 'extension', 'extension', 'extent', 'extraterrestrial', 'extreme', 'eye', 'eyebrow', 'facade', 'face', 'facility', 'facility', 'fact', 'factor', 'factory', 'failure', 'failure', 'failure', 'fair', 'fair', 'fairy', 'faith', 'fall', 'descent', 'fall', 'twilight', 'fame', 'family', 'fan', 'fantasy', 'fare', 'farm', 'farmer', 'fashion', 'fat', 'fat', 'father', 'fault', 'fault', 'favor', 'favour', 'favourite', 'fax', 'fear', 'feast', 'feather', 'feature', 'feature', 'federation', 'fee', 'feedback', 'feeling', 'feeling', 'feminist', 'fence', 'ferry', 'festival', 'fever', 'few', 'fibre', 'fiction', 'field', 'field', 'fig', 'fight', 'figure', 'figure', 'file', 'file', 'file', 'file', 'film', 'film', 'film', 'filter', 'final', 'finance', 'finger', 'fireplace', 'fire', 'fire', 'fire', 'firefighter', 'firm', 'fish', 'fish', 'fisherman', 'fist', 'convulsion', 'fitness', 'fixture', 'flag', 'flash', 'flash', 'flash', 'flat', 'flat', 'flavor', 'fleet', 'flesh', 'flesh', 'flight', 'flight', 'flight', 'flock', 'flood', 'floor', 'flour', 'flower', 'flu', 'fluctuation', 'fluid', 'fly', 'fog', 'fog', 'fold', 'folk music', 'folk', 'folklore', 'food', 'fool', 'fool', 'foot', 'foot', 'football', 'force', 'force', 'force', 'forecast', 'forehead', 'foreigner', 'forest', 'forestry', 'fork', 'form', 'form', 'form', 'format', 'formation', 'formula', 'fortune', 'fortune', 'fate', 'forum', 'fossil', 'foundation', 'foundation', 'fountain', 'fox', 'fraction', 'fragment', 'skeleton', 'franchise', 'fraud', 'imposter', 'freckle', 'freedom', 'freight', 'frequency', 'freshman', 'refrigerator', 'friend', 'friendship', 'frog', 'front', 'front', 'front', 'fruit', 'frustration', 'fuel', 'fun', 'function', 'function', 'fund', 'funeral', 'fur', 'furniture', 'fuss', 'future', 'galaxy', 'gallery', 'gallon', 'game', 'game', 'gap', 'garage', 'garage', 'garbage', 'garden', 'garlic', 'gas pedal', 'gas', 'gas', 'gate', 'gear', 'gene', 'general', 'generation', 'brilliance', 'gentleman', 'geography', 'gesture', 'ghost', 'ghostwriter', 'giant', 'gift', 'girlfriend', 'girl', 'glacier', 'glance', 'glass', 'glass', 'glass', 'glasses', 'glimpse', 'gloom', 'glory', 'glove', 'glow', 'glue', 'goal', 'goal', 'goal', 'goalkeeper', 'goat', 'god', 'gold', 'golf', 'good', 'good', 'government', 'governor', 'gown', 'grace', 'grace', 'gradient', 'graduate', 'grain', 'grain', 'grammar', 'grandfather', 'grandmother', 'grant', 'graph', 'graphics', 'grass', 'grass', 'grave', 'gravel', 'gravity', 'gravity', 'green', 'green', 'greeting', 'grief', 'grimace', 'grip', 'traction', 'ground', 'grounds', 'growth', 'growth', 'growth', 'guarantee', 'guard', 'guard', 'guerrilla', 'guest', 'guide', 'guide', 'guideline', 'guilt', 'guitar', 'gun', 'gutter', 'habit', 'habitat', 'hair', 'hair', 'haircut', 'half', 'hall', 'hall', 'hall', 'dorm', 'hallway', 'halt', 'ham', 'hammer', 'hand', 'hand', 'hand', 'hand', 'hand', 'harbor', 'hardship', 'hardware', 'harmony', 'harmony', 'harvest', 'hat', 'hay', 'head', 'head', 'head', 'headline', 'headquarters', 'health', 'health', 'heart', 'heart', 'heart', 'heart', 'heat', 'heat', 'heaven', 'hedge', 'heel', 'height', 'heir', 'helicopter', 'hell', 'helmet', 'help', 'help', 'hemisphere', 'hemisphere', 'hen', 'herb', 'herd', 'sandwich', 'hero', 'heroin', 'hierarchy', 'highlight', 'hill', 'hip', 'historian', 'history', 'history', 'history', 'custody', 'hole', 'mess', 'holiday', 'holiday', 'home', 'home', 'honey', 'honor', 'honor', 'hook', 'bait', 'hope', 'horizon', 'horn', 'horn', 'horoscope', 'horror', 'horse', 'horse', 'hospital', 'hospitality', 'host', 'host', 'hostage', 'hostility', 'hostility', 'hotel', 'hour', 'hour', 'house', 'house', 'family', 'houseplant', 'housewife', 'housing', 'human body', 'humanity', 'humor', 'hunter', 'hunting', 'husband', 'hut', 'hypothesis', 'ice', 'ice cream', 'idea', 'ideal', 'identification', 'identity', 'identity', 'ideology', 'ignorance', 'illness', 'illusion', 'illustration', 'image', 'image', 'imagination', 'immigrant', 'immigration', 'impact', 'impact', 'implication', 'import', 'importance', 'improvement', 'momentum', 'impulse', 'incentive', 'inch', 'incident', 'income', 'increase', 'index finger', 'index', 'indication', 'individual', 'industry', 'industry', 'infection', 'inflation', 'influence', 'influence', 'information', 'infrastructure', 'ingredient', 'inhabitant', 'inhibition', 'initial', 'initiative', 'injection', 'injury', 'inn', 'innovation', 'inquiry', 'insect', 'inside', 'insider', 'brainstorm', 'insight', 'insistence', 'inspector', 'inspiration', 'instinct', 'institution', 'institution', 'instruction', 'instrument', 'instrument', 'insurance', 'integration', 'integrity', 'intelligence', 'intelligence', 'intention', 'interaction', 'interest', 'interest', 'interface', 'interference', 'intervention', 'interview', 'introduction', 'introduction', 'introduction', 'invasion', 'investigation', 'investigator', 'investment', 'invitation', 'iron', 'irony', 'island', 'isolation', 'issue', 'offspring', 'item', 'ivory', 'jacket', 'jam', 'jar', 'jaw', 'jazz', 'jelly', 'jet', 'jewel', 'job', 'job', 'jockey', 'joint', 'joint', 'joke', 'journal', 'journal', 'joy', 'judge', 'judgment', 'judgment', 'juice', 'jump', 'junction', 'jungle', 'jurisdiction', 'jury', 'justice', 'justification', 'kettle', 'key', 'key', 'key', 'kick', 'kid', 'kidney', 'killer', 'king', 'king', 'king', 'kingdom', 'kinship', 'kit', 'kitchen', 'kite', 'knee', 'knife', 'knot', 'knowledge', 'Koran', 'label', 'laboratory', 'labour', 'labour', 'laborer', 'lace', 'lack', 'ladder', 'lady', 'lake', 'lamb', 'lamp', 'land', 'land', 'landlord', 'landowner', 'landscape', 'lane', 'language', 'language', 'lap', 'laser', 'laundry', 'law', 'law', 'law', 'lawn', 'lawyer', 'layer', 'layout', 'lead', 'leash', 'lead', 'lead', 'leader', 'leadership', 'leaf', 'leaflet', 'lease', 'leather', 'farewell', 'leave', 'lecture', 'left', 'leftovers', 'leg', 'leg', 'legend', 'legend', 'legislation', 'legislature', 'leisure', 'lemon', 'lemon', 'length', 'length', 'lesson', 'letter', 'letter', 'level', 'level', 'level', 'liability', 'liberty', 'library', 'licence', 'lid', 'lid', 'lie', 'life', 'lifestyle', 'lift', 'lift', 'lift', 'light', 'lighter', 'light', 'lily', 'limb', 'limit', 'limit', 'limitation', 'line', 'line', 'line', 'line', 'line', 'line', 'line', 'line', 'linen', 'link', 'lion', 'lip', 'lip', 'liquid', 'list', 'list', 'literacy', 'literature', 'litigation', 'liver', 'load', 'loan', 'lobby', 'lobby', 'location', 'lock', 'lock', 'log', 'log', 'logic', 'look', 'look', 'loop', 'loop', 'loss', 'loss', 'lot', 'lot', 'lounge', 'sofa', 'love', 'love', 'lover', 'loyalty', 'lump', 'lunch', 'lung', 'machine', 'machinery', 'magazine', 'magnitude', 'maid', 'mail', 'mainstream', 'alimony', 'majority', 'majority', 'makeup', 'man', 'man', 'management', 'manager', 'manner', 'manual', 'manufacture', 'manufacturer', 'manuscript', 'map', 'marathon', 'marble', 'marble', 'march', 'march', 'march', 'margin', 'mark', 'mark', 'market', 'marketing', 'wedding', 'marriage', 'Mars', 'marsh', 'mask', 'mass', 'master', 'match', 'match', 'match', 'match', 'material', 'material', 'mathematics', 'matrix', 'matter', 'maximum', 'mayor', 'maze', 'meadow', 'meal', 'meaning', 'means', 'measure', 'meat', 'mechanism', 'medal', 'medicine', 'medicine', 'medium', 'medium', 'medium', 'meeting', 'meeting', 'member', 'membership', 'memorandum', 'memorial', 'memorial', 'memory', 'memory', 'memory', 'menu', 'menu', 'merchant', 'mercy', 'merit', 'message', 'metal', 'method', 'methodology', 'microphone', 'middle', 'midnight', 'migration', 'mile', 'milk', 'mill', 'mind', 'mind', 'mine', 'mine', 'miner', 'mineral', 'minimum', 'minister', 'minister', 'ministry', 'minority', 'minute', 'miracle', 'mirror', 'miscarriage', 'misery', 'missile', 'mist', 'mixture', 'model', 'model', 'model', 'model', 'model', 'module', 'mole', 'mole', 'mole', 'molecule', 'moment', 'momentum', 'monarch', 'monarchy', 'monastery', 'money', 'money', 'monk', 'monkey', 'monopoly', 'monster', 'month', 'mood', 'moon', 'morale', 'morale', 'morning', 'dawn', 'morsel', 'mortgage', 'mosaic', 'mosque', 'mosquito', 'mother', 'motif', 'motivation', 'motivation', 'motorist', 'highway', 'mold', 'mountain', 'mourning', 'mouse', 'mouse', 'mouth', 'move', 'move', 'movement', 'crusade', 'movement', 'mud', 'mug', 'multimedia', 'murder', 'muscle', 'museum', 'mushroom', 'music', 'musician', 'mutation', 'myth', 'nail', 'nail', 'name', 'name', 'nationalism', 'nationalist', 'nationality', 'nature', 'nature', 'nature', 'navy', 'navy', 'neck', 'need', 'need', 'needle', 'needle', 'neglect', 'negligence', 'negotiation', 'neighbour', 'neighborhood', 'nephew', 'nerve', 'nest', 'net', 'net', 'network', 'network', 'newcomer', 'news', 'news', 'news', 'night', 'nightmare', 'node', 'noise', 'noise', 'nomination', 'nonsense', 'norm', 'north', 'nose', 'note', 'note', 'note', 'note', 'notebook', 'notebook', 'notice', 'notice', 'notion', 'noun', 'novel', 'number', 'number', 'number', 'nun', 'nurse', 'nursery', 'nursery', 'crackpot', 'nut', 'oak', 'object', 'object', 'objection', 'obligation', 'observation', 'observer', 'obstacle', 'occasion', 'occupation', 'ocean', 'offense', 'offense', 'offense', 'offender', 'offer', 'office', 'officer', 'official', 'offspring', 'oil', 'oil', 'omission', 'onion', 'opera', 'operation', 'operation', 'operation', 'operation', 'opinion', 'opinion', 'opponent', 'opposite', 'opposition', 'opposition', 'opposition', 'optimism', 'option', 'orange', 'orange', 'orbit', 'orchestra', 'order', 'order', 'order', 'organ', 'organ', 'organisation', 'orientation', 'origin', 'outfit', 'outlet', 'outlet', 'outlet', 'outline', 'outline', 'outlook', 'output', 'outside', 'oven', 'overall', 'overview', 'owl', 'owner', 'ownership', 'oxygen', 'pace', 'pack', 'pack', 'package', 'packet', 'page', 'pain', 'pain', 'pain', 'paint', 'painter', 'pair', 'palace', 'palm', 'chimpanzee', 'pan', 'panel', 'panel', 'panic', 'paper', 'paper', 'paper', 'paper', 'paper', 'parade', 'paradox', 'paragraph', 'parallel', 'parameter', 'pardon', 'parent', 'park', 'parking', 'parliament', 'part', 'participant', 'particle', 'partner', 'partner', 'partnership', 'party', 'party', 'pass', 'pass', 'passage', 'passage', 'passenger', 'passion', 'passport', 'password', 'past', 'pastel', 'pasture', 'patch', 'patch', 'patch', 'patent', 'path', 'patience', 'patient', 'patrol', 'pattern', 'pause', 'pavement', 'payment', 'peace', 'peace', 'peak', 'peanut', 'peasant', 'pedestrian', 'pen', 'pen', 'penalty', 'pencil', 'penny', 'pension', 'retiree', 'people', 'pepper', 'percent', 'perception', 'performance', 'performance', 'performer', 'period', 'period', 'period', 'period', 'permission', 'person', 'personality', 'pest', 'pet', 'phenomenon', 'philosopher', 'philosophy', 'philosophy', 'photograph', 'photographer', 'photography', 'physics', 'piano', 'picture', 'picture', 'movie', 'pie', 'piece', 'piece', 'pier', 'pig', 'pig', 'policeman', 'pig', 'pigeon', 'pile', 'pill', 'pillow', 'pilot', 'pin', 'pioneer', 'pipe', 'pit', 'pit', 'pitch', 'slant', 'pitch', 'pity', 'place', 'place', 'plaintiff', 'plan', 'plane', 'planet', 'plant', 'plant', 'plaster', 'plastic', 'plate', 'platform', 'play', 'play', 'player', 'player', 'pleasure', 'plot', 'plot', 'plot', 'pneumonia', 'pocket', 'poem', 'poetry', 'point', 'point', 'point', 'poison', 'pole', 'pole', 'policy', 'politician', 'politics', 'poll', 'poll', 'pollution', 'pony', 'pool', 'pop', 'pop', 'pop', 'population', 'porter', 'portion', 'portrait', 'position', 'position', 'position', 'possession', 'possibility', 'post', 'post', 'postcard', 'pot', 'pot', 'potato', 'potential', 'pottery', 'pound', 'pound', 'powder', 'power', 'power', 'practice', 'practice', 'praise', 'prayer', 'precedent', 'precision', 'predator', 'predecessor', 'preference', 'prejudice', 'premium', 'preoccupation', 'preparation', 'prescription', 'prescription', 'presence', 'presence', 'present', 'present', 'presentation', 'preservation', 'presidency', 'president', 'president', 'press', 'press', 'pressure', 'pressure', 'pressure', 'prestige', 'prevalence', 'prey', 'price', 'price', 'pride', 'primary', 'prince', 'princess', 'principle', 'print', 'printer', 'priority', 'prison', 'prisoner', 'privacy', 'privilege', 'prize', 'loot', 'probability', 'problem', 'problem', 'procedure', 'process', 'produce', 'producer', 'product', 'product', 'product', 'production', 'production', 'production', 'profession', 'professional', 'professor', 'profile', 'profit', 'program', 'program', 'program', 'program', 'progress', 'project', 'prediction', 'projection', 'promise', 'promotion', 'promotion', 'proof', 'proof', 'propaganda', 'property', 'property', 'proportion', 'proportion', 'proposal', 'proposal', 'proposition', 'prosecution', 'prospect', 'prosperity', 'protection', 'shelter', 'protein', 'protest', 'provision', 'psychologist', 'psychology', 'bar', 'public', 'publication', 'publication', 'publicity', 'publisher', 'pudding', 'pump', 'pumpkin', 'punch', 'punch', 'pupil', 'pupil', 'purpose', 'hobby', 'pursuit', 'puzzle', 'pyramid', 'qualification', 'quality', 'quantity', 'quarter', 'quarter', 'quarter', 'quarter', 'queen', 'quest', 'question', 'questionnaire', 'queue', 'quota', 'quotation', 'quotation', 'rabbit', 'race', 'race', 'racism', 'rack', 'radiation', 'radiation sickness', 'radical', 'radio', 'radio', 'rage', 'raid', 'railcar', 'railroad', 'track', 'rain', 'rainbow', 'rally', 'range', 'range', 'range', 'range', 'rank', 'rat', 'strikebreaker', 'rate', 'ratio', 'reaction', 'reaction', 'reaction', 'reactor', 'reader', 'reader', 'realism', 'reality', 'reason', 'reason', 'rebel', 'rebellion', 'receipt', 'reception', 'reception', 'recession', 'recognition', 'recommendation', 'record', 'record', 'record', 'record', 'recording', 'recovery', 'recovery', 'recreation', 'red', 'reduction', 'redundancy', 'referee', 'reference', 'reference', 'referral', 'reflection', 'reform', 'refugee', 'refusal', 'regard', 'region', 'register', 'register', 'registration', 'regret', 'regulation', 'rehabilitation', 'rehabilitation', 'rehearsal', 'reign', 'rejection', 'relation', 'relationship', 'relaxation', 'release', 'relevance', 'reliance', 'relief', 'reluctance', 'remark', 'remedy', 'rent', 'repetition', 'replacement', 'report', 'report', 'reporter', 'representative', 'representative', 'reproduction', 'reptile', 'republic', 'reputation', 'request', 'requirement', 'research', 'researcher', 'reserve', 'supply', 'reservoir', 'residence', 'resident', 'resignation', 'resignation', 'resolution', 'resort', 'resource', 'response', 'response', 'responsibility', 'rest', 'rest', 'rest', 'restaurant', 'restoration', 'restraint', 'restriction', 'result', 'retailer', 'retirement', 'retreat', 'return', 'return', 'return', 'return', 'revenge', 'reverse', 'review', 'review', 'review', 'review', 'revival', 'revolution', 'revolution', 'reward', 'rhetoric', 'rhythm', 'rib', 'ribbon', 'rice', 'rider', 'ridge', 'rifle', 'right', 'right', 'right wing', 'ring', 'ring', 'ring', 'riot', 'orgy', 'rise', 'rise', 'risk', 'ritual', 'river', 'road', 'robbery', 'looting', 'robot', 'rock', 'rocket', 'role', 'role', 'roll', 'roll', 'roll', 'roll', 'roof', 'room', 'ancestor', 'root', 'rope', 'rose', 'rotation', 'rung', 'route', 'routine', 'quarrel', 'row', 'royalty', 'royalty', 'rubbish', 'rugby', 'ruin', 'ruin', 'rule', 'rule', 'rule', 'rule', 'rule', 'rule', 'rule', 'rule', 'rumor', 'runner', 'rush', 'sacrifice', 'sacrifice', 'safety', 'cruise', 'sailor', 'salad', 'sale', 'sale', 'salmon', 'salon', 'salt', 'salvation', 'sample', 'sanctuary', 'sand', 'sandal', 'satellite', 'satisfaction', 'sauce', 'sausage', 'scale', 'scale', 'scale', 'scandal', 'scenario', 'scene', 'scene', 'scene', 'scene', 'schedule', 'scheme', 'scholar', 'scholar', 'scholarship', 'school', 'school', 'science', 'scientist', 'grudge', 'score', 'scrap', 'screen', 'sieve', 'screen', 'screw', 'script', 'sculpture', 'sea', 'seal', 'seal', 'search', 'season', 'seat', 'buttocks', 'second', 'second', 'mystery', 'secret', 'secretary', 'secretion', 'section', 'sector', 'security', 'seed', 'seed', 'selection', 'selection', 'selection', 'self', 'seller', 'seminar', 'senior', 'sensation', 'sense', 'sense', 'sense', 'sensitivity', 'sentence', 'sentence', 'sentiment', 'separation', 'sequence', 'series', 'series', 'servant', 'waiter', 'service', 'service', 'service', 'service', 'session', 'session', 'set', 'set', 'settlement', 'settlement', 'sex', 'nuance', 'shadow', 'shaft', 'shaft', 'shame', 'shame', 'disgrace', 'share', 'share', 'shareholder', 'shark', 'sheep', 'sheet', 'sail', 'sheet', 'shelf', 'shell', 'shell', 'shell', 'shell', 'shelter', 'shield', 'shift', 'shift', 'shirt', 'shock', 'shock', 'shoe', 'horseshoe', 'shop', 'shop', 'shopping', 'short circuit', 'shortage', 'shorts', 'shot', 'shot', 'shoulder', 'shoulder', 'show', 'shower', 'shower', 'sickness', 'side', 'side', 'side', 'siege', 'sight', 'sign', 'sign', 'sign', 'sign', 'sign', 'sign', 'signature', 'silence', 'silence', 'silk', 'flatware', 'silver', 'silver', 'similarity', 'simplicity', 'sin', 'singer', 'sink', 'sister', 'site', 'site', 'situation', 'size', 'sketch', 'ski', 'skill', 'skin', 'skin', 'peel', 'skirt', 'skull', 'sky', 'slab', 'slave', 'sleep', 'sleeve', 'slice', 'slide', 'slide', 'slime', 'gaffe', 'slogan', 'slot', 'slot', 'smell', 'smell', 'smile', 'smoke', 'snail', 'snake', 'snow', 'soap', 'soccer', 'society', 'sociology', 'sock', 'sodium', 'software', 'soil', 'soil', 'soldier', 'solidarity', 'solo', 'solution', 'solution', 'soprano', 'soul', 'sound', 'soup', 'source', 'source', 'source', 'south', 'south', 'space', 'space', 'speaker', 'speaker', 'specialist', 'species', 'specimen', 'spectrum', 'speech', 'speech', 'speech', 'speed', 'speed', 'spell', 'trance', 'sphere', 'sphere', 'spider', 'spinach', 'spine', 'spirit', 'spirit', 'spirit', 'spite', 'split', 'split', 'spokesman', 'spoon', 'sport', 'spot', 'spray', 'ranch', 'spread', 'banquet', 'spring', 'spring', 'spring', 'spy', 'squad', 'square', 'square', 'stable', 'staff', 'staff', 'stage', 'stage', 'staircase', 'stake', 'stall', 'stamp', 'stand', 'stand', 'standard', 'star', 'star', 'star', 'star', 'start', 'state', 'state', 'statement', 'statement', 'station', 'statistics', 'statue', 'steak', 'steam', 'steel', 'stem', 'step', 'step', 'step', 'step', 'steward', 'stick', 'joystick', 'stimulation', 'stitch', 'stock', 'stock', 'stock', 'stomach', 'stone', 'pit', 'gem', 'stool', 'stop', 'storage', 'storm', 'story', 'story', 'strap', 'straw', 'straw', 'strawberry', 'stream', 'street', 'strength', 'strength', 'stress', 'strike', 'strike', 'strike', 'string', 'comic strip', 'strip', 'stroke', 'structure', 'struggle', 'student', 'studio', 'study', 'study', 'study', 'style', 'style', 'subject', 'subject', 'subject', 'substance', 'suburb', 'success', 'suffering', 'sugar', 'suggestion', 'suicide', 'suit', 'courtship', 'suite', 'sulphur', 'sum', 'summary', 'summer', 'summit', 'sun', 'sun', 'Sunday', 'sunrise', 'sunshine', 'superintendent', 'supermarket', 'supervisor', 'supply', 'support', 'support', 'support', 'support', 'surface', 'surgeon', 'surgery', 'surprise', 'survey', 'survival', 'survivor', 'survivor', 'suspect', 'suspicion', 'suspicion', 'sweat', 'sweater', 'sweet', 'swing', 'swing', 'switch', 'sword', 'syllable', 'symbol', 'symmetry', 'symptom', 'syndrome', 'system', 'table', 'table', 'tablet', 'tactic', 'tail', 'tail', 'talk', 'talk', 'tank', 'tap', 'tap', 'tape', 'tape', 'tape', 'target', 'taste', 'taste', 'tax', 'taxi', 'taxpayer', 'tea', 'teacher', 'team', 'tear', 'technique', 'technology', 'teenager', 'telephone', 'television', 'television', 'temperature', 'temple', 'temple', 'temptation', 'tenant', 'tendency', 'tennis', 'tension', 'tension', 'tent', 'term', 'terminal', 'terrace', 'terrorist', 'test', 'test', 'text', 'text', 'texture', 'thanks', 'theater', 'theft', 'theme', 'theme', 'theology', 'theorist', 'theory', 'therapist', 'therapy', 'thesis', 'thigh', 'thinker', 'thought', 'thread', 'threat', 'threshold', 'brink', 'throat', 'throne', 'thumb', 'ticket', 'ticket', 'tide', 'tie', 'tie', 'tiger', 'tile', 'timber', 'time', 'timetable', 'can', 'tin', 'tip', 'tip', 'tip', 'tissue', 'tissue', 'title', 'title', 'title', 'title', 'title', 'toast', 'toe', 'toll', 'tomato', 'ton', 'tone', 'tongue', 'tongue', 'tool', 'tooth', 'tooth', 'top', 'top', 'top', 'top', 'flashlight', 'torch', 'torture', 'touch', 'tourism', 'tourist', 'tournament', 'towel', 'tower', 'town', 'toy', 'trace', 'track', 'track', 'track', 'tract', 'trade', 'trade', 'trade', 'tradition', 'traffic', 'traffic', 'tragedy', 'train', 'trainer', 'training', 'trait', 'transaction', 'transfer', 'transition', 'transmission', 'transport', 'ecstasy', 'trap', 'tray', 'treasure', 'treasurer', 'treat', 'treatment', 'treatment', 'treaty', 'tree', 'trench', 'trend', 'trial', 'trial', 'triangle', 'tribe', 'tribute', 'trick', 'trick', 'trolley', 'troop', 'trouble', 'trouble', 'trouser', 'truck', 'trunk', 'trust', 'trust', 'trustee', 'truth', 'truth', 'n t-shirt%1:06:00::', 'subway', 'tube', 'tumour', 'tune', 'tunnel', 'turkey', 'turn', 'twin', 'braid', 'twist', 'tycoon', 'tire', 'ulcer', 'umbrella', 'uncertainty', 'uncle', 'understanding', 'unemployment', 'uniform', 'union', 'marriage', 'unit', 'unity', 'university', 'unrest', 'urge', 'urgency', 'urine', 'use', 'use', 'use', 'user', 'user', 'vacuum', 'vacuum', 'valley', 'value', 'value', 'value', 'van', 'avant-garde', 'variable', 'variant', 'variation', 'variety', 'vat', 'vector', 'vegetable', 'vegetarian', 'vegetation', 'vehicle', 'veil', 'vein', 'velvet', 'venture', 'Venus', 'verdict', 'version', 'version', 'vessel', 'vessel', 'veteran', 'victim', 'victory', 'video', 'view', 'view', 'view', 'villa', 'village', 'villager', 'violation', 'virgin', 'virtue', 'virus', 'computer virus', 'vision', 'visit', 'visitor', 'vitamin', 'voice', 'spokesperson', 'volcano', 'volume', 'volume', 'volume', 'volunteer', 'vote', 'vote', 'voter', 'voucher', 'voyage', 'wage', 'wagon', 'waist', 'wake', 'wall', 'war', 'ward', 'ward', 'ward', 'wardrobe', 'warning', 'warrant', 'warrior', 'waste', 'waste', 'watch', 'watch', 'water', 'waterfall', 'wave', 'way', 'way', 'weakness', 'weakness', 'wealth', 'weapon', 'weather', 'wedding', 'weed', 'week', 'weekend', 'weight', 'weight', 'weight', 'welcome', 'welfare', 'welfare', 'well', 'west', 'west', 'whale', 'wheat', 'wheel', 'bike', 'whip', 'whiskey', 'egg white', 'widow', 'width', 'wife', 'wilderness', 'wildlife', 'will', 'will', 'willpower', 'win', 'wind', 'window', 'wine', 'wing', 'wing', 'winner', 'winter', 'wire', 'witch', 'withdrawal', 'withdrawal', 'witness', 'witness', 'wolf', 'woman', 'wonder', 'wood', 'wool', 'word', 'word', 'wording', 'work', 'work', 'work', 'worker', 'workshop', 'world', 'world', 'world', 'world', 'worm', 'worm', 'worth', 'wound', 'wreck', 'wrist', 'writer', 'n x-ray%1:06:00::', 'yacht', 'yard', 'yard', 'year', 'youth', 'youth', 'zero', 'zone', 'abandon', 'abolish', 'abridge', 'absorb', 'accept', 'accompany', 'activate', 'add', 'adjust', 'admire', 'admit', 'admit', 'adopt', 'adopt', 'advance', 'affect', 'feign', 'afford', 'age', 'agree', 'match', 'allow', 'amputate', 'amuse', 'answer', 'apologize', 'appeal', 'appear', 'applaud', 'appoint', 'appreciate', 'approach', 'approve', 'arrange', 'arrange', 'arrest', 'articulate', 'ascertain', 'ask', 'expect', 'assume', 'impound', 'attack', 'attract', 'authorise', 'avoid', 'endorse', 'bake', 'balance', 'ostracize', 'banish', 'bargain', 'bark', 'carry', 'beat', 'beat', 'scramble', 'beat', 'beat', 'become', 'beg', 'begin', 'behave', 'behead', 'belong', 'flex', 'bend', 'bet', 'betray', 'bind', 'bond', 'bite', 'blame', 'blame', 'blast', 'bleed', 'bless', 'block', 'waste', 'board', 'boil', 'bomb', 'borrow', 'bother', 'bounce', 'bow', 'brag', 'break', 'disclose', 'pause', 'wear out', 'break in', 'breathe', 'breed', 'bring', 'bring', 'brush', 'displace', 'burn', 'burn', 'burst', 'bury', 'buy', 'call', 'call', 'call', 'call', 'predict', 'calm', 'cancel', 'captivate', 'capture', 'care', 'carry', 'carve', 'hurl', 'cast', 'catch', 'capture', 'cater', 'challenge', 'change', 'switch', 'charge', 'charge', 'charge', 'charge', 'chase', 'check', 'check', 'chew', 'choke', 'choke', 'choose', 'chop', 'claim', 'clarify', 'classify', 'clear', 'acquit', 'climb', 'close', 'close', 'coincide', 'collapse', 'collect', 'combine', 'comfort', 'compare', 'remunerate', 'compete', 'complain', 'compromise', 'concede', 'conceive', 'concentrate', 'confine', 'confront', 'congratulate', 'consider', 'consolidate', 'construct', 'contain', 'control', 'command', 'convert', 'convict', 'convince', 'falsify', 'cooperate', 'cope', 'copy', 'copy', 'correspond', 'cough', 'count', 'treat', 'cover', 'crash', 'smash', 'dash', 'crash', 'create', 'creep', 'cower', 'crop', 'graze', 'cross', 'crouch', 'cry', 'cultivate', 'curl', 'reduce', 'cut', 'damn', 'dance', 'dare', 'debate', 'debut', 'decide', 'determine', 'decline', 'decrease', 'dedicate', 'defend', 'define', 'delay', 'delay', 'delete', 'deliver', 'deport', 'rescue', 'demand', 'demolish', 'demonstrate', 'denounce', 'deny', 'deny', 'digress', 'depend', 'deprive', 'describe', 'desert', 'deserve', 'despise', 'deter', 'deteriorate', 'modernize', 'train', 'develop', 'arise', 'devote', 'dictate', 'break down', 'die', 'disagree', 'differ', 'dig', 'excavate', 'dilute', 'dine', 'dip', 'direct', 'direct', 'disappear', 'disappoint', 'discourage', 'discover', 'discuss', 'disguise', 'dislike', 'dismiss', 'display', 'quarrel', 'thaw', 'distort', 'distribute', 'dive', 'divide', 'divorce', 'document', 'dominate', 'donate', 'double', 'doubt', 'drag', 'trail', 'drain', 'tie', 'pull', 'draw', 'draw', 'withdraw', 'dress', 'drink', 'drive', 'deteriorate', 'dribble', 'drop', 'drown', 'drug', 'dump', 'ditch', 'eat', 'eavesdrop', 'choose', 'elect', 'eliminate', 'embark', 'employ', 'encourage', 'endure', 'enhance', 'enlarge', 'ensure', 'enter', 'enter', 'entertain', 'escape', 'establish', 'exaggerate', 'exceed', 'exclude', 'eject', 'excuse', 'execute', 'exhibit', 'prosper', 'elaborate', 'expand', 'expect', 'experiment', 'explain', 'explode', 'explode', 'exploit', 'export', 'expose', 'extend', 'confront', 'fade', 'fail', 'faint', 'decrease', 'fall', 'fan', 'fascinate', 'fast', 'fear', 'feel', 'fight', 'fill', 'film', 'find', 'find', 'finish', 'fire', 'equip', 'fit', 'fix', 'flash', 'fling', 'splurge', 'flood', 'flourish', 'flush', 'flush', 'fly', 'fold', 'follow', 'follow', 'follow', 'fool around', 'forbid', 'force', 'coerce', 'forge', 'forget', 'form', 'organize', 'formulate', 'foster', 'frame', 'frame', 'exempt', 'freeze', 'freeze', 'frighten', 'fund', 'gain', 'gasp', 'stare', 'generate', 'get', 'feed', 'give', 'give', 'give', 'give', 'give', 'glance', 'glare', 'glide', 'glow', 'die', 'go', 'graduate', 'greet', 'grin', 'grind', 'groan', 'grow', 'guard', 'guess', 'handicap', 'hang', 'happen', 'harm', 'hate', 'haul', 'haunt', 'have', 'heal', 'hear', 'help', 'hesitate', 'hiccup', 'hide', 'hide', 'hike', 'hit', 'hit', 'defend', 'support', 'hold', 'hold', 'hook', 'host', 'hover', 'offend', 'hurt', 'hypnothize', 'identify', 'ignore', 'dismiss', 'illustrate', 'imagine', 'import', 'impress', 'improve', 'include', 'include', 'increase', 'indulge', 'infect', 'inflate', 'inherit', 'inject', 'injure', 'insert', 'insist', 'inspire', 'instal', 'install', 'insure', 'intensify', 'translate', 'interrupt', 'introduce', 'introduce', 'introduce', 'invite', 'jail', 'twitch', 'jest', 'skip', 'jump', 'parachute', 'justify', 'keep', 'keep', 'keep', 'keep', 'kick', 'kill', 'kiss', 'knead', 'kneel', 'knit', 'knock', 'know', 'know', 'know', 'land', 'endure', 'laugh', 'launch', 'lay', 'lead', 'lead', 'leak', 'lean', 'learn', 'teach', 'leave', 'leave', 'leave', 'lend', 'lease', 'level', 'license', 'lick', 'lie', 'lie', 'revoke', 'plagiarize', 'light', 'ignite', 'like', 'restrict', 'linger', 'link', 'list', 'listen', 'load', 'locate', 'lock', 'lodge', 'yearn', 'look', 'look', 'lose', 'misplace', 'love', 'enjoy', 'frown', 'make', 'cook', 'make', 'manage', 'manage', 'fabricate', 'march', 'market', 'master', 'match', 'matter', 'mean', 'measure', 'evaluate', 'meet', 'meet', 'mention', 'mind', 'minimize', 'mislead', 'miss', 'miss', 'lack', 'miss', 'mix', 'model', 'move', 'move', 'move', 'move', 'multiply', 'mutter', 'nap', 'need', 'nod', 'nominate', 'notice', 'obey', 'object', 'obscure', 'obtain', 'occupy', 'offend', 'offer', 'offer', 'offset', 'open', 'oppose', 'organize', 'mastermind', 'overlook', 'overwhelm', 'owe', 'pack', 'paint', 'paint', 'park', 'participate', 'pass', 'pass', 'elapse', 'legislate', 'pass', 'exceed', 'pat', 'pay', 'penetrate', 'perceive', 'perforate', 'perform', 'persist', 'persuade', 'photocopy', 'pick', 'pluck', 'pile', 'rank', 'plan', 'design', 'play', 'bet', 'play', 'play', 'play', 'plead', 'please', 'pledge', 'plot', 'plot', 'plug', 'poison', 'polish', 'pop', 'post', 'postpone', 'swarm', 'pour', 'pray', 'beg', 'preach', 'precede', 'prefer', 'present', 'urge', 'press', 'squeeze', 'prevent', 'print', 'proclaim', 'produce', 'profit', 'prosecute', 'protect', 'prove', 'provide', 'provoke', 'harass', 'publish', 'extract', 'pump', 'punch', 'punch', 'punish', 'advertise', 'push', 'put', 'qualify', 'qualify', 'question', 'quit', 'quote', 'race', 'build', 'lift', 'raise', 'raise', 'promote', 'rape', 'achieve', 'reach', 'read', 'realize', 'rear', 'recognize', 'recognize', 'recommend', 'record', 'recover', 'recruit', 'recycle', 'redeem', 'refer', 'reflect', 'reflect', 'reform', 'refuse', 'reject', 'deny', 'register', 'regret', 'reinforce', 'reject', 'relate', 'relax', 'release', 'relieve', 'relinquish', 'trust', 'remain', 'commemorate', 'remind', 'repeat', 'replace', 'represent', 'represent', 'reproduce', 'request', 'command', 'rescue', 'resemble', 'resent', 'reserve', 'resign', 'resist', 'resist', 'respect', 'rest', 'restrain', 'retain', 'retire', 'retire', 'retreat', 'return', 'return', 'refund', 'reveal', 'reverse', 'review', 'revise', 'revive', 'reward', 'tease', 'ride', 'ring', 'arise', 'rise', 'rise', 'rise', 'rise', 'risk', 'roar', 'rob', 'rock', 'roll', 'wander', 'row', 'rub', 'scratch', 'rule', 'run', 'run', 'run', 'flow', 'escape', 'sail', 'save', 'save', 'say', 'scan', 'scatter', 'scramble', 'scrape', 'scratch', 'scream', 'screen', 'screen', 'cheat', 'screw', 'seal', 'secure', 'see', 'see', 'see', 'seek', 'seem', 'seize', 'sell', 'betray', 'mail', 'broadcast', 'branch', 'separate', 'discriminate', 'serve', 'serve', 'set', 'plant', 'set', 'settle', 'settle', 'reconcile', 'sink', 'shake', 'rock', 'shape', 'share', 'shatter', 'shave', 'shed', 'budge', 'polish', 'shine', 'shiver', 'stun', 'shock', 'shoot', 'shoot', 'shout', 'abuse', 'show', 'show', 'show', 'shrink', 'shrug', 'sigh', 'sightsee', 'sign', 'sing', 'sip', 'sit', 'skate', 'slam', 'slap', 'slide', 'slip', 'slump', 'smash', 'smell', 'smell', 'smile', 'smoke', 'snap', 'snarl', 'snatch', 'snap', 'kidnap', 'sniff', 'snuggle', 'soak', 'overcharge', 'pawn', 'soar', 'solve', 'sow', 'spare', 'spare', 'speculate', 'speed', 'spend', 'spill', 'spin', 'spin', 'spin', 'spit', 'split', 'spoil', 'spoil', 'spoil', 'spray', 'circulate', 'spread', 'square', 'squeeze', 'embrace', 'squash', 'extort', 'stab', 'stain', 'stereotype', 'stamp', 'stand', 'stand', 'depart', 'stay', 'step', 'mistreat', 'stick', 'pierce', 'sting', 'stir', 'stop', 'stop', 'store', 'storm', 'straighten', 'strain', 'stress', 'stretch', 'stride', 'strike', 'strike', 'undress', 'stroke', 'stroll', 'study', 'stuff', 'overeat', 'stumble', 'resign', 'substitute', 'suffer', 'suggest', 'evoke', 'suit', 'support', 'hypothesize', 'suppress', 'surround', 'sustain', 'swallow', 'swallow', 'swear', 'swear', 'sweep', 'swell', 'swim', 'float', 'swing', 'swipe', 'swop', 'take', 'take', 'talk', 'tap', 'tap', 'taste', 'tease', 'tease', 'tell', 'tempt', 'terrify', 'testify', 'thank', 'think', 'think', 'remember', 'threaten', 'confuse', 'throw', 'thrust', 'tick', 'tie', 'time', 'tiptoe', 'topple', 'tolerate', 'toss', 'total', 'touch', 'train', 'transfer', 'transform', 'tread', 'treat', 'treat', 'tremble', 'trip', 'trouble', 'try', 'try', 'try', 'tumble', 'tune', 'bend', 'turn', 'rotate', 'twist', 'wriggle', 'underline', 'undermine', 'understand', 'understand', 'undertake', 'update', 'upset', 'upset', 'urge', 'use', 'utter', 'visit', 'vote', 'wait', 'wake', 'walk', 'digress', 'want', 'warn', 'wash', 'wash', 'waste', 'watch', 'wave', 'wear', 'weave', 'weigh', 'weigh', 'whip', 'whisper', 'widen', 'win', 'wind', 'wipe', 'withdraw', 'wonder', 'work', 'work out', 'worry', 'wrap', 'wrestle', 'write', 'write', 'spell', 'compose', 'yawn']