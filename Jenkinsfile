pipeline {
    agent any

    environment {
        PATH = "$PATH:/usr/local/bin/docker-compose"
    }

    stages {

        stage('Checkout') {
            steps {
                echo '[Checkout]...'
                sh 'printenv'
                echo '...[Checkout]'
            }
        }
        stage('Build') {
            steps {
                echo '[Building]...'
                sh "docker-compose build"
                echo '...[Building]'
            }
        }
        stage('Deploy') {
            steps {
                echo '[Deploying]....'
                sh "docker-compose up -d"
                echo '...[Deploying]'
            }
        }
    }
}
