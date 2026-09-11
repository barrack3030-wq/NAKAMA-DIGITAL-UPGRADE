const OWNER = 'barrack3030-wq';
const REPO = 'NAKAMA-DIGITAL-UPGRADE';
const BRANCH = 'main';

export interface GithubFile {
  path: string;
  sha: string;
  content?: string;
  encoding?: string;
}

function headers(token: string) {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };
}

export function rawUrl(path: string) {
  return `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${path}`;
}

export async function getFile(token: string, path: string): Promise<GithubFile> {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`, {
    headers: headers(token),
  });
  if (!res.ok) throw new Error(`GitHub GET ${path}: ${res.status} ${await res.text()}`);
  return res.json();
}

export async function upsertTextFile(token: string, path: string, content: string, message: string) {
  let sha: string | undefined;
  try {
    const current = await getFile(token, path);
    sha = current.sha;
  } catch (error) {
    if (!String(error).includes('404')) throw error;
  }

  const body: Record<string, string> = {
    message,
    content: btoa(unescape(encodeURIComponent(content))),
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: headers(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GitHub PUT ${path}: ${res.status} ${await res.text()}`);
  return res.json();
}

export async function uploadFile(token: string, path: string, file: File, message: string) {
  const base64 = await fileToBase64(file);
  let sha: string | undefined;
  try {
    const current = await getFile(token, path);
    sha = current.sha;
  } catch (error) {
    if (!String(error).includes('404')) throw error;
  }

  const body: Record<string, string> = { message, content: base64, branch: BRANCH };
  if (sha) body.sha = sha;
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: headers(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GitHub upload ${path}: ${res.status} ${await res.text()}`);
  return res.json();
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.onload = () => {
      const result = String(reader.result || '');
      resolve(result.split(',')[1] || '');
    };
    reader.readAsDataURL(file);
  });
}
