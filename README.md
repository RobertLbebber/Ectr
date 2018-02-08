<h1>Annual Fund</h1>
<h3> How to run (Locally)</h3>
<ol>
<li>Clone Repo
</li><li>I <b>Strongly Encourage downloading Visual Studio Code</b> (not Visual Studio) better than brackets in every way <i>and can be easily modded to have the same look and feel as Brackets</i>
</li><li>You will need NodeJs to be installed on your system <i>This means install globally</i>. For Reasons such as Node gives you the npm commands. 
</li><li>You will also need to have an Apache and MySql application running. <i>This is for future implementation of the db, which hasn't been implemented yet. But this is necessary for starting the server (unless alterations are made to the <code>config/connnections.js</code>)</i>. 
  <ul><h5>This means you will need to set up a dbms and the db.</h5>
    <li>I use XAMPP. Google xampp. Should come up, download it. 
    </li><li>Run Apache 
    </li><li>Run MySQL
    </li><li>See that everything is up and running by hitting the admin button
    </li><li>It will open a local page. Go to phpMyAdmin
    </li><li><i>At this point we are entering into uncharted territory.</i> You may have to create a database to mimic the one expected by the program. The name is annualfund and can be seen in the <code>config/connnections.js</code>. 
    </li><br>
    One thing to note at this point is that this is one setup that allows for MySQL and phpMyAdmin to work with sails. But sails allows for other database systems such as Mongodb. Both of which I have worked with. 
  </ul>
  </li><li>I think at this point we should have all the necessary applications installed. XAMPP, Visual Studio Code (VSC), and NodeJS/NPM. So lets continue.
  </li><li>We will first need open VSC and open the terminal <code>ctrl+`</code>.  
  </li><li>We have to make sure we are located in the root directory of our project. This is where the <code>package.json</code> file is. If you are not there navigate there now.
  </li><li>Cool, you're there! For our project we need a good heap of js code prior to starting our app. To install everything in a quick an easy way, we can type <code>npm install</code> in the terminal. This will install every javascript file needed as directed by <code>package.json</code>.
  </li><li>If not already installed make sure sails is installed. This is afterall what will run our program. The code for this will be <code>npm install -g sails</code> <i>the -g is for global, the --save would save it into the package.json</i>. We will now have access to all the sails terminal commands. Which we will need. 
  </li><li>Make sure the Apache and MySQL are up and running first. Now we can run our server. Almost done! 
  </li><li>To run our server we will type <code>sails lift</code>. Thats it. Hopefully there are no errors, (but I doubt that.)
  </li><li>Now should be able to go to you localhost:1337 and it will direct you to your verion of <b>AnnualFund</b>
</ol>
