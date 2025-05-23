# Document Processing Application

This repository contains a proof‑of‑concept for uploading documents, extracting text with Apache Tika and storing results in PostgreSQL. The project consists of a React frontend and an Express/TypeScript backend.

## Repository Layout

- `backend/` – Express API handling uploads and persisting data
- `frontend/` – React application (Create React App)
- `docker-compose.yml` – Development stack including Postgres and Apache Tika
- `docs/` – Design documents and plans

## Running Locally with Docker Compose

Ensure Docker and Docker Compose are installed. From the project root run:

```bash
docker-compose up --build
```

The backend will be available at `http://localhost:3001` and the frontend at `http://localhost:3000`.

Open the frontend in your browser and use the simple form to upload a document. Once processed the extracted text will be displayed.

## Development Plan

The development roadmap is described in [docs/phase2_plan.md](docs/phase2_plan.md). The current implementation allows you to upload a file and view the extracted text. Structured logs are emitted to the console and all services run via Docker Compose.

### Running Tests

Backend tests use Jest while Playwright drives the browser for end‑to‑end tests. Run them with:

```bash
npm test --prefix backend
npm test --prefix frontend -- --watchAll=false
npm run test:e2e --prefix frontend
```

GitHub Actions runs these commands on every push.

### Kubernetes Deployment

Example manifests are provided in the `k8s/` directory for deploying the stack. Apply them with `kubectl apply -f k8s/` once a cluster is configured.

## License

This project is licensed under the terms of the Apache License 2.0. See [LICENSE](LICENSE) for details.
