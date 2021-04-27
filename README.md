1. remove the git remote for the repo of the template using "git remote remove origin"
2. add your repo to git remote using "git remote add origin <link to your repo>.git"
3. Uncomment the .env from the .gitignore file to protect your environment variables;
4. Remember to change the database name so that you are not using the same database as another project;
5. If you need to seed your db then use the seed file and change the model accordingly;
6. If your using the model make sure to change the cat model to what u need it to be;
7. Once you have made the initial modifications above, make sure to create a github repo for the project;
8. In your terminal add all changes 'git add .';
9. In your terminal commit all your changes 'git commit -m "initial commit using template"';
10. In terminal push your initial set up to have your first commit online 'git push origin master';
