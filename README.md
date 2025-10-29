# 🦍 ApeBox — Local AI & Automation Hub

ApeBox est une **solution d’IA locale** pensée pour les **PME et indépendants** qui veulent utiliser l’intelligence artificielle **sans dépendre du cloud**.
Le prototype actuel permet de lancer une **infrastructure IA locale plug-and-play**, avec :

* un **chatbot** (Open WebUI + vLLM),
* un **moteur d’automatisation** (n8n),
* un **drive collaboratif** (Nextcloud),
* et une **interface d’administration unifiée** — *ApeUI*.

---

## 🧠 Objectif du prototype

L’objectif est de simuler le comportement d’une **ApeBox** physique :
une appliance qui démarre, héberge plusieurs services, et offre un **tableau de bord unique** pour tout piloter.

Au démarrage :

1. L’utilisateur accède à `http://apebox.local`
2. Il voit un **dashboard simple** affichant ses services (Chatbot, n8n, Drive)
3. Il peut :

   * Démarrer / arrêter un service
   * Accéder à son interface web
   * Vérifier l’état (Running / Stopped)

---

## ⚙️ Stack technique

| Composant               | Rôle                 | Technologie             |
| ----------------------- | -------------------- | ----------------------- |
| 🧠 LLM local            | Chatbot (API OpenAI) | Open WebUI + vLLM       |
| 🔁 Automatisation       | Workflows IA         | n8n                     |
| ☁️ Stockage local       | Drive collaboratif   | Nextcloud               |
| 🧩 Interface admin      | Gestion centralisée  | ApeUI (FastAPI + React) |
| 🐳 Conteneurisation     | Déploiement portable | Docker Compose          |
| 🔒 Sécurité (plus tard) | Accès distant / MAJ  | Tailscale + Watchtower  |

---

## 🧩 Arborescence du projet

```
apebox/
├── docker-compose.yml        # Définition des services
├── apeui/                    # Interface d'administration
│   ├── backend/              # API FastAPI
│   │   ├── main.py
│   │   └── requirements.txt
│   └── frontend/             # Dashboard React
│       ├── package.json
│       └── src/
│           └── App.jsx
└── data/                     # Données persistantes
    ├── n8n/
    ├── nextcloud/
    └── llm/
```

---

## 🚀 Installation et lancement

### 🧩 Prérequis

* Ubuntu Server 22.04 (ou Jetson Linux)
* Docker & Docker Compose installés
* Accès local via navigateur

### ⚙️ Étapes

1. **Cloner le projet**

   ```bash
   git clone https://github.com/JLucGauvrit/apebox.git
   cd apebox
   ```

2. **Construire et lancer**

   ```bash
   docker compose up -d
   ```

3. **Accéder à l’interface**

   ```
   http://localhost
   ```

   (ou `http://apebox.local` sur ton LAN)

---

## 🧭 Services inclus

| Service        | Port   | Description                   |
| -------------- | ------ | ----------------------------- |
| **ApeUI**      | `80`   | Tableau de bord (admin)       |
| **Open WebUI** | `8080` | Chatbot local connecté à vLLM |
| **n8n**        | `5678` | Automatisations IA            |
| **Nextcloud**  | `8081` | Drive collaboratif local      |

---

## 🔧 Commandes utiles

```bash
# Voir les logs d’un service
docker compose logs -f apeui

# Redémarrer tout
docker compose restart

# Arrêter tout
docker compose down
```

---

## 🧱 Développement local

Pour modifier l’interface ApeUI :

```bash
cd apeui/frontend
npm install
npm run dev
```

Le frontend se servira automatiquement du backend FastAPI sur le port 8081.

---

## 🛠️ Roadmap

| Étape   | Objectif                                              |
| ------- | ----------------------------------------------------- |
| ✅ v0.1  | Prototype de base (Open WebUI, n8n, Nextcloud)        |
| 🔄 v0.2 | Dashboard dynamique connecté à Docker                 |
| 🧠 v0.3 | Intégration d’ApeFlow (workflows IA prêts à l’emploi) |
| 🧩 v0.4 | Système de mise à jour et monitoring distant          |
| 🏭 v1.0 | Version installable sur Jetson / mini-PC              |

---

## 🤝 Contribution

Toute aide est bienvenue :

* UI/UX simplification
* Intégration d’autres workflows (ERP, CRM, support)
* Optimisation ARM / Jetson
* Documentation et packaging

---

## 🦍 À propos

**ApeBox** est un projet de la startup **ApeBase**, qui vise à démocratiser l’IA locale souveraine pour les PME.

> *“Bring AI home — simple, secure, and yours.”*
