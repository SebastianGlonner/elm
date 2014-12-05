/**
 * requires
 *  document.createElement
 *  document.createTextNode
 *
 * @param {[type]} _module [description]
 * @param {[type]} doc     [description]
 * @param {[type]} body    [description]
 */
var pTest = (function DOMTE(_module, doc, body) {

  /*
   * P R I V A T E
   */
  var
      options = {
        iterations: 10000000
      },

      /**
       * Run a specific test and insert it into body.
       * @param  {[type]} params [description]
       * @return {[type]}        [description]
       */
      runTest = function(params) {
        var
            name = params.name,
            i = -1,
            fncLength = params.fncs.length,
            results = [],
            fncParams,
            result,
            j,
            fncArgs = params.arguments,
            argsLength = fncArgs.length,

            head = createTableHeader(fncArgs),
            elements = createTable(name, head);
        // @var

        if (params.results === undefined ||
            params.results.conclusion === undefined) {
          while (++i < fncLength) {
            fncParams = params.fncs[i];

            j = -1;
            result = [];
            while (++j < argsLength)
              result.push(runFunction(fncParams.fnc, fncArgs[j].params));

            insertResults(elements[1], fncParams.definition, result);
          }
        }

        body.appendChild(elements[0]);

        if (params.results !== undefined &&
            params.results.conclusion !== undefined)
          processResults(body, params.results);

      },

      runFunction = function(fnc, args) {
        var
            start = new Date().getTime(),
            i = 0,
            l = options.iterations;
        // @var

        for (; i < l; i++) {
          fnc.apply(null, args);
        }

        return (new Date().getTime() - start);
      },

      createTable = function(name, tableHead) {
        var
            container = doc.createElement('div'),
            header = doc.createElement('h1'),
            table = doc.createElement('table'),
            tbody = doc.createElement('tbody');
        // @var

        container.appendChild(header);
        container.appendChild(table);
        table.appendChild(tableHead);
        table.appendChild(tbody);

        header.appendChild(doc.createTextNode(name));

        return [container, tbody];
      },


      createTableHeader = function(args) {
        var
            i = -1,
            argsLength = args.length,
            head = doc.createElement('thead'),
            tr = doc.createElement('tr'),
            thDefinition = doc.createElement('th'),
            th;
        // @var

        head.appendChild(tr);
        tr.appendChild(thDefinition);

        while (++i < argsLength) {
          th = doc.createElement('th');
          th.appendChild(doc.createTextNode(args[i].definition));
          tr.appendChild(th);

        }

        return head;
      },

      insertResults = function(parent, definition, results) {
        var
            tdDefinition = doc.createElement('td'),
            td,
            tr = doc.createElement('tr'),

            i = -1,
            l = results.length;
        // @var


        tr.appendChild(tdDefinition);
        tdDefinition.appendChild(doc.createTextNode(definition));

        while (++i < l) {
          td = doc.createElement('td');
          td.appendChild(doc.createTextNode(results[i]));
          tr.appendChild(td);
        }

        parent.appendChild(tr);
      },

      processResults = function(parent, results) {
        if (results.conclusion !== null) {
          var conclusionText = doc.createElement('h2');
          conclusionText.appendChild(doc.createTextNode(results.conclusion));

          parent.appendChild(conclusionText);

        }


      }; // @var


  /*
   * P U B L I C
   */
  _module.addTest = runTest;

  _module.setIterations = function(intIter) {
    options.iterations = intIter;
  };

  return _module;
})(pTest || {}, document, document.body);
