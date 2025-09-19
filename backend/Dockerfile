# Stage 1: Build the application using Maven
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of the application source code
COPY src ./src

# Package the application
RUN mvn package -DskipTests

# Stage 2: Create a smaller final image to run the application
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the built .jar file from the 'build' stage
COPY --from=build /app/target/academiasphere-0.0.1-SNAPSHOT.jar .

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "academiasphere-0.0.1-SNAPSHOT.jar"]