#!/usr/bin/env node
'use strict';
const fs = require('fs');
const sql = require('mssql');


//Driver={ODBC Driver 13 for SQL Server};Server=tcp:blockchain.database.windows.net,1433;Database=Test_Blockchain_DWH;Uid=BC_Admin@blockchain;Pwd={your_password_here};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;
//Driver={ODBC Driver 13 for SQL Server};Server=tcp:blockchain.database.windows.net,1433;Database=Test_Blockchain_DWH;Uid=BC_Admin@blockchain;Pwd={your_password_here};Encrypt=yes;
// TrustServerCertificate=no;Connection Timeout=30;

//

var config = {
   user: 'BC_Admin',
   password: '!1Palchun!1Palchun',
   server: 'blockchain.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
   database: 'Test_Blockchain_DWH',
   stream: true, // You can enable streaming globally

   options: {
      encrypt: true // Use this if you're on Windows Azure
   }
}

sql.connect(config, function(err) {
   if (err) {
      throw err;
   }

   console.log('= #1= ===== ===');

   var request = new sql.Request();
   console.log('= #2 ====== ===');
   request.stream = true; // You can set streaming differently for each request
   request.query("INSERT INTO [Test_Blockchain_DWH].[dbo].T_Blockchains([Name]) VALUES (N'test')"); // or request.execute(procedure);
   console.log('= #2 ====== ===');

   request.on('recordset', function(columns) {
      console.log('= #3 ====== recordset ===');
      console.log(columns);


      // Emitted once for each recordset in a query
   });

   request.on('row', function(row) {
      console.log('= #4 ====== row ===');
      console.log(row);
      // Emitted for each row in a recordset
   });

   request.on('error', function(err) {
      console.log('= #5 ====== error ===');
      console.log(err);
      // May be emitted multiple times
   });

   request.on('done', function(affected) {
      console.log(affected);
      // Always emitted as the last one
   });

});

sql.on('error', function(err) {
   // ... error handler
   console.log(err);
});
