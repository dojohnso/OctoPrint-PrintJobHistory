

function PrintJobHistoryAPIClient(pluginId, baseUrl) {

    this.pluginId = pluginId;
    this.baseUrl = baseUrl;


    // see https://gomakethings.com/how-to-build-a-query-string-from-an-object-with-vanilla-js/
    var _buildRequestQuery = function (data) {
        // If the data is already a string, return it as-is
        if (typeof (data) === 'string') return data;

        // Create a query array to hold the key/value pairs
        var query = [];

        // Loop through the data object
        for (var key in data) {
            if (data.hasOwnProperty(key)) {

                // Encode each key and value, concatenate them into a string, and push them to the array
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
        }
        // Join each item in the array with a `&` and return the resulting string
        return query.join('&');

    };


    this.getExportUrl = function(exportType){
        return "./plugin/" + this.pluginId + "/exportPrintJobHistory/" + exportType + "?apikey=" + jQuery.ajaxSettings.headers["X-Api-Key"];
    }

    this.getSnapshotUrl = function(snapshotFilename){
        //http://localhost:5000/plugin/PrintJobHistory/printJobSnapshot/20191003-153311
        return "./plugin/" + this.pluginId + "/printJobSnapshot/" + snapshotFilename + "?apikey=" + jQuery.ajaxSettings.headers["X-Api-Key"];
    }

    this.uploadSnapshotUrl = function(snapshotFilename){
        //http://localhost:5000/plugin/PrintJobHistory/printJobSnapshot/20191003-153311
        return "./plugin/" + this.pluginId + "/upload/snapshot/" + snapshotFilename + "?apikey=" + jQuery.ajaxSettings.headers["X-Api-Key"];
    }

    // load FILTERED/SORTED PrintJob-Items
    this.callLoadPrintJobsByQuery = function (tableQuery, responseHandler){
        query = _buildRequestQuery(tableQuery);
        urlToCall = this.baseUrl + "plugin/"+this.pluginId+"/loadPrintJobHistoryByQuery?"+query;
        $.ajax({
            //url: API_BASEURL + "plugin/"+PLUGIN_ID+"/loadPrintJobHistory",
            url: urlToCall,
            type: "GET"
        }).done(function( data ){
            responseHandler(data)
            //shoud be done by the server to make sure the server is informed countdownDialog.modal('hide');
            //countdownDialog.modal('hide');
            //countdownCircle = null;
        });
    }

    // @DEPRECATED load all PrintJob-Items
    this.callLoadPrintHistoryJobs = function (responseHandler){
        $.ajax({
            //url: API_BASEURL + "plugin/"+PLUGIN_ID+"/loadPrintJobHistory",
            url: this.baseUrl + "plugin/"+this.pluginId+"/loadPrintJobHistory",
            type: "GET"
        }).done(function( data ){
            responseHandler(data)
            //shoud be done by the server to make sure the server is informed countdownDialog.modal('hide');
            //countdownDialog.modal('hide');
            //countdownCircle = null;
        });
    }

    // remove PrintJob-Item
    this.callUpdatePrintJob = function (databaseId, printJobItem, responseHandler){
        jsonPayload = ko.toJSON(printJobItem)

        $.ajax({
            //url: API_BASEURL + "plugin/"+PLUGIN_ID+"/loadPrintJobHistory",
            url: this.baseUrl + "plugin/" + this.pluginId + "/updatePrintJob/" + databaseId,
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: jsonPayload,
            type: "PUT"
        }).done(function( data ){
            responseHandler();
        });
    }

    // remove PrintJob-Item
    this.callRemovePrintJob = function (databaseId, responseHandler){
        $.ajax({
            //url: API_BASEURL + "plugin/"+PLUGIN_ID+"/loadPrintJobHistory",
            url: this.baseUrl + "plugin/" + this.pluginId + "/removePrintJob/" + databaseId,
            type: "DELETE"
        }).done(function( data ){
            responseHandler();
        });
    }

    // deactivate the Plugin/Check
    this.callDeactivatePluginCheck =  function (){
        $.ajax({
            url: this.baseUrl + "plugin/"+ this.pluginId +"/deactivatePluginCheck",
            type: "PUT"
        }).done(function( data ){
            //responseHandler(data)
        });
    }

    // deactivate the Plugin/Check
    this.callTakeSnapshot =  function (snapshotFilename, responseHandler){
        $.ajax({
            url: this.baseUrl + "plugin/"+ this.pluginId +"/takeSnapshot/"+snapshotFilename,
            type: "PUT"
        }).done(function( data ){
            responseHandler(data)
        });
    }

    // delete snapshotImage
    this.callDeleteSnapshotImage =  function (snapshotFilename, responseHandler){
        $.ajax({
            url: this.baseUrl + "plugin/"+ this.pluginId +"/deleteSnapshotImage/"+snapshotFilename,
            type: "DELETE"
        }).done(function( data ){
            responseHandler(data)
        });
    }



}
