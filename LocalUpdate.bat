@REM 更新本地的 github 仓库与htdoc目录下的文件，采用翻盖的形式执行。

@set PathBackup=F:\project\ExpressSystem\Express_CMS\web_backup\
@set PathF=F:\project\ExpressSystem\Express_CMS\web\
@set PathC=C:\xampp\htdocs\

@set Index=index.php
@set Fset=css ext font images php script 

@REM 测试
@REM for %%c in (%Fset%) do   xcopy %PathF%%%c %PathBackup%%%c /D /S /Y /EXCLUDE:.svn 

@echo 请输入更新策略： 1 or 2。 \n\t 1：用github/web仓库覆盖htdoc目录。2 相反。

@CHOICE /C 12 /N /M "请选择："
if errorlevel 2 goto level2
if errorlevel 1 goto level1

:level1
@echo level1

@set PathSrc1=F:\project\ExpressSystem\Express_CMS\web\
@set PathDst1=C:\xampp\htdocs\
@REM 下面两行代码不移到 end 代码块
 @echo data-backup
 for %%c in (%Fset%) do xcopy %PathDst1%%%c %PathBackup%%%c /D /S /Y
 xcopy %PathDst1%index.php %PathBackup%index.php /Y
 @echo data-update
 for %%c in (%Fset%) do xcopy %PathSrc1%%%c %PathDst1%%%c /D  /S /Y
 xcopy %PathSrc1%index.php %PathDst1%index.php /Y

goto end

:level2
@echo level2

@set PathSrc2=C:\xampp\htdocs\
@set PathDst2=F:\project\ExpressSystem\Express_CMS\web\
 @echo data-backup
 for %%c in (%Fset%) do xcopy %PathDst2%%%c %PathBackup%%%c /D /S /Y
 xcopy %PathDst2%index.php %PathBackup%index.php /Y
 @echo data-update 
 for %%c in (%Fset%) do xcopy %PathSrc2%%%c %PathDst2%%%c /D /S /Y
 xcopy %PathSrc2%index.php %PathDst2%index.php

goto end

:end

@REM echo %PathSrc1% level1
@REM echo %PathDst1%
@REM echo %PathSrc2% level2
@REM echo %PathDst2%
@pause

