Set up on Windows Machine to make the Protractor script to run

1. Download Node and NPM from the website
https://nodejs.org/en/download/

2. Install on the Windows machine.

3. Once installed open the Command Prompt and verify the installation.

4. node -v and npm -v will show the installed versions.


5. Make sure to update the chrome to the latest version. Chrome 80. Since I have used the chromedriver for Chrome 80.

6. Open Chrome and click Help > About Google Chrome.

7. Update to the latest version. It should show like

Google Chrome is up to date Version 80.0.3987.116 (Official Build) (64-bit)

8. I have downloaded the chromedriver and packaged it with the Git repo. If it’s not the case, the chrome driver should be downloaded from https://chromedriver.chromium.org/downloads

9. Choose the appropriate version, in my case chrome 80.  https://chromedriver.storage.googleapis.com/index.html?path=80.0.3987.106/

[Skip the steps 8 and 9, since the file is already downloaded] 10. Then install Protractor globally using the command

npm install -g protractor

10. Clone / download the git repo from https://github.com/alagappan-annamalai/<gitRepo> 

11. From the Command prompt go to the root directory and run the command

npm install

12. The above command will pick the dependencies from package.json and run to create node_modules folder

13. Finally run

npm test

14. This will run the Suite on Chrome Browser since I have made directConnect:true in configuration file.

15. The Grunt runner is in place on the Git repository.

For Sequential execution,

grunt rsapp_seq_execution --target="chrome"

For Parallel execution,

grunt rsapp_parallel_execution --target="chrome"

16. Create a directory named .gitignore and create a file in it with naming as environment.json
17. Keep the below key value pair in the file.

{
    "login":{
        "email": <Riversand Email ID in Double Quotes>,
        "password": <Riversand Password in Double Quotes>
    }
}
