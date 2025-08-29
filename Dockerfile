FROM openjdk:21
EXPOSE 8080
ADD /backend/target/App.jar /App.jar
ENTRYPOINT ["java","-jar","/App.jar"]
