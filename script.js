import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://syjudliqddjntuhmprbv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5anVkbGlxZGRqbnR1aG1wcmJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NjQ3NzgsImV4cCI6MjA2MTI0MDc3OH0.wUYdldfz1dxDw3yMEIvur0egqcd7EYSRBV3GV-m0gG0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function loadData() {
  try {
    const spinner = document.getElementById("spinner");
    const table = document.getElementById("data-table");
    const tbody = table.querySelector("tbody");

    const { data, error } = await supabase
      .from('horarios')
      .select('*')
      .order('fecha', { ascending: true });

    if (error) {
      console.error('Error al cargar los datos:', error);
      return;
    }

    tbody.innerHTML = "";

    data.forEach((row, index) => {
      const tr = document.createElement("tr");
      tr.className = "bg-white text-gray-800";

      ["nombre", "fecha", "turno", "modalidad"].forEach(key => {
        const td = document.createElement("td");
        td.className = "border px-4 py-2";
        td.textContent = row[key];
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    spinner.classList.add("hidden");
    table.classList.remove("hidden");

  } catch (err) {
    console.error("Error al cargar los datos:", err);
  }
}

window.onload = loadData;

// Nueva funcion para descargar la tabla como PNG
window.descargarTabla = async function() {
  const tabla = document.getElementById("data-table");

  if (!tabla) return;

  html2canvas(tabla, { backgroundColor: null }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "horario.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}
