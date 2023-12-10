FROM openjdk:17-jdk-alpine
ARG JAR_FILE=build/libs/basic1-0.0.1-SNAPSHOT.jar
CMD ["mkdir", "-p", "/projects/cnote/images"]
COPY ${JAR_FILE} cnote-app.jar
COPY ./images /projects/cnote/images
EXPOSE 8088
ENTRYPOINT ["java","-jar","/cnote-app.jar"]
