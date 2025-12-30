// ecosystem.config.cjs
const fs = require("fs");
const path = require("path");

// .env 파일 읽기
function loadEnv() {
	const envPath = path.join(__dirname, ".env");
	const env = {};

	if (fs.existsSync(envPath)) {
		const envFile = fs.readFileSync(envPath, "utf8");
		envFile.split("\n").forEach((line) => {
			const trimmedLine = line.trim();
			// 주석이나 빈 줄 무시
			if (!trimmedLine || trimmedLine.startsWith("#")) return;

			const [key, ...valueParts] = trimmedLine.split("=");
			if (key && valueParts.length > 0) {
				env[key.trim()] = valueParts.join("=").trim();
			}
		});
	}

	return env;
}

const envVars = loadEnv();

module.exports = {
	apps: [
		{
			name: "frontend",
			script: "npx", // 실행할 명령어
			args: "react-router-serve ./build/server/index.js", // 명령어에 전달할 인자
			cwd: "./", // 프로젝트 루트 디렉터리
			instances: 1,
			env: {
				NODE_ENV: "production",
				PORT: 3000, // 서버가 사용할 포트
				...envVars, // .env 파일의 모든 환경 변수 포함
			},
		},
	],
};
