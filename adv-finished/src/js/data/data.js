define(['ojs/ojcore', 'knockout', 'jquery'],
        function (oj, ko, $)
        {
            function fetchData(url) {
                return $.getJSON(url);
            }

            function fetchPerson(url) {
                  return $.getJSON(url);
            }

            return {fetchData: fetchData};
        });


                