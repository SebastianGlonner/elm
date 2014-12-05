(function(pTest) {
  var longString = 'ein relativ kurzer stringein relativ kurzer' +
      'stringein relativ kurzer stringein relativ kurzer stringein' +
      'relativ kurzer stringein relativ kurzer stringein relativ kurzer' +
      'stringein relativ kurzer string';

  pTest.addTest({
    'name': 'compare String.substr() to String.slice()',
    'arguments': [{
      'definition': 'small string',
      'params': [
        'ein relativ kurzer string',
        4,
        9
      ]
    },{
      'definition': 'long string',
      'params': [
        longString,
        4,
        199
      ]
    }
    ],
    'fncs': [{
      'definition': 'substr',
      'fnc': function(str, start, end) {
        var test = str.substr(start, end);
      }
    },{

      'definition': 'slice',
      'fnc': function(str, start, end) {
        var test = str.slice(start, end);
      }
    }
    ],
    'results': {
      'highlight' : '<',
      'conclusion': 'No significant differences but slice is little faster'
    }
  });

  pTest.addTest({
    'name': 'scope access performance',
    'arguments': [{
      'definition': 'access 1 time',
      'params': [1]
    },{
      'definition': 'access 5 time',
      'params': [5]
    },{
      'definition': 'access 10 time',
      'params': [10]
    },{
      'definition': 'access 100 time',
      'params': [100]
    },{
      'definition': 'access 1000 time',
      'params': [1000]
    },{
      'definition': 'access 10000 time',
      'params': [10000]
    }
    ],
    'fncs': [{
      'definition': 'access by scope',
      'fnc': function(countTimes) {
        var outerScopeVar = 1;

        var callFunc = function() {
          var localVar;
          for (var i = 0; i < countTimes; i++) {
            localVar = outerScopeVar;
          }
        };

        callFunc();
      }
    },{

      'definition': 'access by local ref',
      'fnc': function(countTimes) {
        var outerScopeVar = 1;

        var callFunc = function() {
          var localVar;
          var localRef = outerScopeVar;
          for (var i = 0; i < countTimes; i++) {
            localVar = localRef;
          }
        };

        callFunc();
      }
    }
    ],
    'results': {
      'highlight' : '<',
      'conclusion': 'access by local ref begins to be faster > 15 times access'
    }
  });


  pTest.addTest({
    'name': 'v8 inline caching',
    'arguments': [{
      'definition': 'reading',
      'params': [true]
    },{
      'definition': 'writing',
      'params': [false]
    }
    ],
    'fncs': [{
      'definition': 'access const dot named property (obj.n = 1)',
      'fnc': function(read) {
        var obj = {n: 1};
        var propertyName = 'n';
        var read = null;

        if (!read)
          obj.n = 1;
        else
          read = obj.n;
      }
    },{

      'definition': 'access dynamic string named property (obj[\'n\'] = 1)',
      'fnc': function(read) {
        var obj = {n: 1};
        var propertyName = 'n';
        var read = null;

        if (!read)
          obj['n'] = 1;
        else
          read = obj['n'];
      }
    },{

      'definition': 'access dynamic named property (obj[pN] = 1)',
      'fnc': function(read) {
        var obj = {n: 1};
        var propertyName = 'n';
        var read = null;

        if (!read)
          obj[propertyName] = 1;
        else
          read = obj[propertyName];
      }
    }
    ],
    'results': {
      'highlight' : '<',
      'conclusion': 'access by dynamic property name is 3 times slower'
    }
  });

})(pTest);
