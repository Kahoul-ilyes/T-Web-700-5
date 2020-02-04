def baseDomain = 't-web.epitech.castornaut.com'

pipeline {
    agent any
    environment {
        CI = 'true'
        PRIVATE_NETWORK = 'private-network'
    }
    stages {

        stage('Environment') {
            steps {
                script {
                    echo '[Environment]...'
                    if (env.BRANCH_NAME == 'master') {
                        env.BACKEND_DOMAIN = "backend.${baseDomain}";
                        env.FRONTEND_DOMAIN = "${baseDomain}";
                    } else {
                        env.BACKEND_DOMAIN = "backend.${BRANCH_NAME}.${baseDomain}";
                        env.FRONTEND_DOMAIN = "${BRANCH_NAME}.${baseDomain}";
                    }
                    sh 'printenv'
                    echo '...[Environment]'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        echo '[Building PROD]...'
                        sh "docker-compose -f docker-compose.prod.yml build"
                    } else {
                        echo "[Building ${JOB_BASE_NAME}]..."
                        sh "docker-compose -f docker-compose.staging.yml -p ${BRANCH_NAME} build"
                    }
                    echo "...[Building ${BRANCH_NAME}]"
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        echo '[Deploying PROD]...'
                        sh "docker-compose -f docker-compose.prod.yml up -d"
                    } else if (env.BRANCH_NAME == 'develop') {
                        echo '[Deploying DEV]...'
                        sh "docker-compose -f docker-compose.staging.yml -p ${BRANCH_NAME} up -d"
                    }
                    echo '...[Deploying]'
                }
            }
        }
    }
}
