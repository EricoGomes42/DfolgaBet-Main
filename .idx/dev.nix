{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
  ];
  idx.extensions = [
    "svelte.svelte-vscode"
    "vue.volar"
  ];
  idx.previews = {
  previews = {
    web = {
      command = [
        "npx"
        "vite"
        "--host"
        "0.0.0.0"
        "--port"
        "$PORT"
      ];
      manager = "web";
    };
  };
};