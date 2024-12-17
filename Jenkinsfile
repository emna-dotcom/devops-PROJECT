pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'mounj75/static-api-image'
        DOCKER_HUB_CREDENTIALS = 'docker-hub-creds-ID' // Nom des credentials dans Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                // Extrait le code du repository GitHub
                git 'https://github.com/emna-dotcom/devops-PROJECT.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Crée l'image Docker
                    bat 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    // Connexion à Docker Hub et push de l'image
                    withCredentials([usernamePassword(credentialsId: "$DOCKER_HUB_CREDENTIALS", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        bat 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        bat 'docker push $DOCKER_IMAGE'
                    }
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                script {
                    // Déployer l'image Docker dans un conteneur
                    bat 'docker run -d -p 3000:3000 $DOCKER_IMAGE'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
