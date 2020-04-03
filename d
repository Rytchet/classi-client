warning: LF will be replaced by CRLF in src/App.js.
The file will have its original line endings in your working directory
[1mdiff --git a/public/favicon.ico b/public/favicon.ico[m
[1mdeleted file mode 100644[m
[1mindex bcd5dfd..0000000[m
Binary files a/public/favicon.ico and /dev/null differ
[1mdiff --git a/public/logo192.png b/public/logo192.png[m
[1mdeleted file mode 100644[m
[1mindex fc44b0a..0000000[m
Binary files a/public/logo192.png and /dev/null differ
[1mdiff --git a/public/logo512.png b/public/logo512.png[m
[1mdeleted file mode 100644[m
[1mindex a4e47a6..0000000[m
Binary files a/public/logo512.png and /dev/null differ
[1mdiff --git a/src/App.js b/src/App.js[m
[1mindex 13a0a7c..eec2caa 100644[m
[1m--- a/src/App.js[m
[1m+++ b/src/App.js[m
[36m@@ -2,7 +2,7 @@[m [mimport React from 'react';[m
 import AppNavbar from './components/AppNavbar';[m
 import AppCarousel from './components/AppCarousel';[m
 import Listings from './components/Listings';[m
[31m-import { BrowserRouter as Router, Route } from 'react-router-dom';[m
[32m+[m[32mimport { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';[m
 import 'bootstrap/dist/css/bootstrap.min.css';[m
 import ClassicCars from './components/pages/ClassicCars';[m
 [m
[1mdiff --git a/src/components/pages/ClassicCars.js b/src/components/pages/ClassicCars.js[m
[1mdeleted file mode 100644[m
[1mindex 23af478..0000000[m
[1m--- a/src/components/pages/ClassicCars.js[m
[1m+++ /dev/null[m
[36m@@ -1,9 +0,0 @@[m
[31m-import React from 'react';[m
[31m-[m
[31m-export default function ClassicCars() {[m
[31m-  return ([m
[31m-    <React.Fragment>[m
[31m-      <h1>Get listings from API - Put into cards</h1>[m
[31m-    </React.Fragment>[m
[31m-  );[m
[31m-}[m
