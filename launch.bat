@echo off
@title BeiDou
chcp 65001

java  -Dspring.config.location=application.yml -jar BeiDou.jar
pause