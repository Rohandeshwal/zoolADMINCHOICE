
echo . 
echo "Do git pull"
git pull
echo "Do npm install"
npm install
echo "Do ng build"
ng build --prod --base-href ""
echo "Copy the build files js files into htdocs folder in xampp"
cp -a ./dist/adminChoiceBoard/. E:/xampp/htdocs/choiceBoardAdmin-Dev/
# explorer .
echo "go inside htdocs project folder"
cd E:/xampp/htdocs/choiceBoardAdmin-Dev
# explorer .
#echo "replace content to change base href in index.html"

# code E:/xampp/htdocs/NECPRS/index.html

#(Get-Content E:/xampp/htdocs/NECPRS/index.html ).Replace('<base href="/" />','<base href="/necprs/" />') | Out-File E:/xampp/htdocs/NECPRS/index.html

#echo "replaced contents"
# (Get-Content ./test.txt ).Replace('awesome','bogus') | Out-File ./test.txt


echo "start chrome with public url for the project"
start http://106.51.226.169/choiceBoardAdmin/