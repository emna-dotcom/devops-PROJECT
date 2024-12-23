pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'mounj75/static-api-image'
        DOCKER_TAG = 'latest' // Les tags Docker doivent être en minuscules
        DOCKER_HUB_CREDENTIALS = 'docker-hub-creds-ID' // Nom des credentials dans Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']], // Assurez-vous que 'main' est correct
                        userRemoteConfigs: [[
                            url: 'https://github.com/emna-dotcom/devops-PROJECT.git',
                            credentialsId: 'git-hub-creds-ID' // Votre ID Jenkins credentials
                        ]]
                    ])
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Crée l'image Docker
                    bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    // Connexion à Docker Hub et push de l'image
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        bat "docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}"
                        bat "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    }
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                script {
                    // Déployer l'image Docker dans un conteneur
                    bat "docker run -d -p 3000:3000 ${DOCKER_IMAGE}:${DOCKER_TAG}"
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

