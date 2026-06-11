function guardarUsuario() {

    const nombre = document.getElementById('input-nombre').value.trim();
    const apellido = document.getElementById('input-apellido').value.trim();
    const email = document.getElementById('input-email').value.trim();
    const rol = document.getElementById('input-rol').value;
    const estado = document.getElementById('input-estado').value === 'true';

    if (!nombre || !rol || !email) {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Nombre, correo y rol son obligatorios.',
            background: '#EEF8F5',
            color: '#2C3333',
            confirmButtonColor: '#395B64'
        });
        return;
    }

    const nuevoId = Math.floor(Math.random() * 900) + 100;

    baseUsuarios.push({
        id: nuevoId,
        nombre: `${nombre} ${apellido}`.trim(),
        rol: rol,
        activo: estado
    });

    renderizarTablaUsuarios();

    function agregarNotificacion(mensaje, icono, color) {
        totalNotificaciones++;

        const badge = document.getElementById("badge-notificaciones");
        if (badge) {
            badge.innerText = totalNotificaciones;
            badge.style.display = "block";
        }

        const menu = document.getElementById("menu-notificaciones");
        if (menu) {
            const item = document.createElement("li");

            // Se eliminan clases oscuras fijas para adoptar las propiedades del archivo CSS
            item.innerHTML = `
            <a class="dropdown-item py-2" href="#" style="border-bottom: 1px solid rgba(165,201,202,0.25);">
                <i class="fas ${icono} text-${color} me-2"></i>
                ${mensaje}
                <br>
                <small class="text-muted ms-4" style="font-size: 0.7rem;">
                    Justo ahora
                </small>
            </a>
        `;

            // Inserta la notificación justo debajo del encabezado
            menu.insertBefore(item, menu.children[1]);
        }
    }
    document.getElementById('form-nuevo-usuario').reset();

    bootstrap.Modal.getInstance(
        document.getElementById('modalUsuario')
    ).hide();

    Swal.fire({
        icon: 'success',
        title: 'Usuario registrado',
        text: `${nombre} ${apellido} fue agregado como ${rol}.`,
        background: '#EEF8F5',
        color: '#2C3333',
        confirmButtonColor: '#395B64'
    });

}

function togglePasswordVisibility() {
    const input = document.getElementById('input-password');
    const icono = document.getElementById('icon-ojo');
    if (input.type === 'password') {
        input.type = 'text';
        icono.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icono.classList.replace('fa-eye-slash', 'fa-eye');
    }
}
// Ocultar bienvenida a los 5 segundos
setTimeout(() => {
    const msj = document.getElementById('mensaje-bienvenida');
    if (msj) {
        msj.style.opacity = '0';
        setTimeout(() => msj.style.display = 'none', 500);
    }
}, 5000);

// FIX: cargarHTML ahora usa el iframe existente correctamente
function cargarHTML(url) {
    document.querySelectorAll('.seccion-admin').forEach(sec => sec.style.display = 'none');

    const iframe = document.getElementById('marco-externo');
    iframe.src = url;
    iframe.style.display = 'block';
}

/* ===========================
   SISTEMA NOTIFICACIONES
=========================== */

let totalNotificaciones = 0;

function agregarNotificacion(mensaje, icono, color) {

    totalNotificaciones++;

    const badge = document.getElementById("badge-notificaciones");

    badge.innerText = totalNotificaciones;
    badge.style.display = "block";

    const menu = document.getElementById("menu-notificaciones");

    const item = document.createElement("li");

    item.innerHTML = `
                <a class="dropdown-item text-light border-bottom border-secondary py-2" href="#">
                    <i class="fas ${icono} text-${color} me-2"></i>
                    ${mensaje}
                    <br>
                    <small class="text-muted ms-4">
                        Justo ahora
                    </small>
                </a>
            `;

    menu.insertBefore(item, menu.children[1]);
}

/* ===========================
   NAVEGACIÓN
=========================== */

function cambiarSeccionLocal(idSeccion) {

    document
        .querySelectorAll(".seccion-admin")
        .forEach(sec => sec.style.display = "none");

    // FIX: también ocultar el iframe cuando se cambia de sección
    const iframe = document.getElementById('marco-externo');
    if (iframe) iframe.style.display = 'none';

    document.getElementById(idSeccion).style.display = "block";

    if (idSeccion === "section-gestion-usuarios") {
        renderizarTablaUsuarios();
    }
}

/* ===========================
   BASE USUARIOS
=========================== */

let baseUsuarios = [

    {
        id: 101,
        nombre: "Carlos Martínez",
        rol: "Operario",
        activo: true
    },

    {
        id: 102,
        nombre: "Textiles XYZ",
        rol: "Proveedor",
        activo: true
    },

    {
        id: 103,
        nombre: "Colegio Andino",
        rol: "Cliente",
        activo: false
    }

];

/* ===========================
   TABLA USUARIOS
=========================== */

function renderizarTablaUsuarios() {

    const tbody =
        document.getElementById(
            "tabla-usuarios-body"
        );

    tbody.innerHTML = "";

    baseUsuarios.forEach((user, index) => {

        const tr =
            document.createElement("tr");

        tr.innerHTML = `
 
                    <td>#${user.id}</td>
 
                    <td>${user.nombre}</td>
 
                    <td>
                        <span class="badge bg-secondary">
                            ${user.rol}
                        </span>
                    </td>
 
                    <td>
 
                        <div class="form-check form-switch d-flex justify-content-center">
 
                            <input
                                class="form-check-input"
                                type="checkbox"
                                ${user.activo ? "checked" : ""}
                                onchange="toggleEstadoUsuario(${index})">
 
                        </div>
 
                    </td>
 
                    <td>
 
                        <button
                            class="btn btn-sm btn-outline-danger"
                            onclick="eliminarUsuario(${index})">
 
                            <i class="fas fa-trash"></i>
 
                        </button>
 
                    </td>
                `;

        tbody.appendChild(tr);

    });

}

/* ===========================
   GUARDAR USUARIO
=========================== */

function guardarUsuario() {

    const nombre =
        document.getElementById(
            "input-nombre"
        ).value;

    const rol =
        document.getElementById(
            "input-rol"
        ).value;

    if (nombre.trim() === "") {

        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Debe ingresar un nombre"
        });

        return;
    }

    const nuevoId =
        Math.floor(Math.random() * 900) + 100;

    baseUsuarios.push({

        id: nuevoId,
        nombre: nombre,
        rol: rol,
        activo: true

    });

    renderizarTablaUsuarios();

    agregarNotificacion(
        `Nuevo usuario creado: ${nombre}`,
        "fa-user-plus",
        "success"
    );

    document
        .getElementById("form-nuevo-usuario")
        .reset();

    const modal =
        bootstrap.Modal.getInstance(
            document.getElementById(
                "modalUsuario"
            )
        );

    modal.hide();

    Swal.fire({
        icon: "success",
        title: "Usuario agregado"
    });
}

/* ===========================
   CAMBIAR ESTADO
=========================== */

function toggleEstadoUsuario(index) {

    baseUsuarios[index].activo =
        !baseUsuarios[index].activo;

    agregarNotificacion(
        `Estado actualizado: ${baseUsuarios[index].nombre}`,
        "fa-user-check",
        "warning"
    );

    renderizarTablaUsuarios();
}

/* ===========================
   ELIMINAR USUARIO
=========================== */

function eliminarUsuario(index) {

    Swal.fire({

        title: "¿Eliminar usuario?",
        text: baseUsuarios[index].nombre,
        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Eliminar"

    }).then((result) => {

        if (result.isConfirmed) {

            agregarNotificacion(
                `Usuario eliminado: ${baseUsuarios[index].nombre}`,
                "fa-user-minus",
                "danger"
            );

            baseUsuarios.splice(index, 1);

            renderizarTablaUsuarios();

            Swal.fire(
                "Eliminado",
                "",
                "success"
            );
        }

    });

}

/* ===========================
   SWEET ALERT CONFIG
=========================== */

const darkModeSwal =
    Swal.mixin({

        background: "#EEF8F5",
        color: "#2C3333",
        confirmButtonColor: "#395B64",
        cancelButtonColor: "#4a6370",
        customClass: {
            popup: 'swal-hebratech'
        }

    });
/* ===========================
   OPERARIOS
=========================== */

let listaTareas = [];

async function formularioOperario() {

    const { value } = await darkModeSwal.fire({

        title: "Asignar Nueva Tarea",
        width: 550,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Asignar Tarea",

        html: `
            <div style="text-align:left; display:flex; flex-direction:column; gap:12px;">
                <div>
                    <label style="color:var(--inactive,#4a6370); font-size:13px;">Operario</label>
                    <select id="sw-operario" class="swal2-input" style="margin:4px 0 0; width:100%; background:#fff; color:#2C3333; border:1px solid #A5C9CA;">
                        <option value="">— Seleccionar operario —</option>
                        <option>Luis Pérez</option>
                        <option>Ana Gómez</option>
                        <option>Jorge Ramírez</option>
                        <option>María Torres</option>
                    </select>
                </div>
                <div>
                    <label style="color:#4a6370; font-size:13px;">Nombre de la tarea</label>
                    <input id="sw-tarea" class="swal2-input" style="margin:4px 0 0; width:100%; background:#fff; color:#2C3333; border:1px solid #A5C9CA;"
                        placeholder="Ej: Corte de tela Oxford blanca">
                </div>
                <div>
                    <label style="color:#4a6370; font-size:13px;">Línea de producción</label>
                    <select id="sw-linea" class="swal2-input" style="margin:4px 0 0; width:100%; background:#fff; color:#2C3333; border:1px solid #A5C9CA;">
                        <option value="">— Seleccionar línea —</option>
                        <option>Línea 1 — Costura</option>
                        <option>Línea 2 — Estampado</option>
                        <option>Línea 3 — Corte</option>
                        <option>Línea 4 — Empaque</option>
                    </select>
                </div>
                <div style="display:flex; gap:10px;">
                    <div style="flex:1;">
                        <label style="color:#4a6370; font-size:13px;">Fecha inicio</label>
                        <input id="sw-fecha-ini" type="date" class="swal2-input" style="margin:4px 0 0; width:100%; background:#fff; color:#2C3333; border:1px solid #A5C9CA;">
                    </div>
                    <div style="flex:1;">
                        <label style="color:#4a6370; font-size:13px;">Fecha límite</label>
                        <input id="sw-fecha-fin" type="date" class="swal2-input" style="margin:4px 0 0; width:100%; background:#fff; color:#2C3333; border:1px solid #A5C9CA;">
                    </div>
                </div>
                <div>
                    <label style="color:#4a6370; font-size:13px;">Prioridad</label>
                    <select id="sw-prioridad" class="swal2-input" style="margin:4px 0 0; width:100%; background:#fff; color:#2C3333; border:1px solid #A5C9CA;">
                        <option>Baja</option>
                        <option selected>Media</option>
                        <option>Alta</option>
                        <option>Urgente</option>
                    </select>
                </div>
                <div>
                    <label style="color:#4a6370; font-size:13px;">Observaciones</label>
                    <textarea id="sw-obs-op" class="swal2-textarea"
                        style="margin:4px 0 0; width:100%; resize:none; background:#fff; color:#2C3333; border:1px solid #A5C9CA;"
                        placeholder="Instrucciones adicionales para el operario..."></textarea>
                </div>
            </div>
        `,

        preConfirm: () => {
            const operario = document.getElementById('sw-operario').value;
            const tarea = document.getElementById('sw-tarea').value.trim();
            const linea = document.getElementById('sw-linea').value;
            const fechaIni = document.getElementById('sw-fecha-ini').value;
            const fechaFin = document.getElementById('sw-fecha-fin').value;
            const prioridad = document.getElementById('sw-prioridad').value;
            const obs = document.getElementById('sw-obs-op').value.trim();

            if (!operario || !tarea || !linea || !fechaIni || !fechaFin) {
                Swal.showValidationMessage('Por favor completa todos los campos obligatorios.');
                return false;
            }
            return { operario, tarea, linea, fechaIni, fechaFin, prioridad, obs };
        }
    });

    if (value) {

        // Guardar en el array
        listaTareas.push({ ...value, id: Date.now(), estado: 'Pendiente' });

        // Renderizar en la sección
        renderizarTareas();

        agregarNotificacion(
            `Tarea "${value.tarea}" asignada a ${value.operario} — ${value.prioridad}`,
            "fa-clipboard-list",
            "success"
        );
    }
}

function renderizarTareas() {

    const contenedor = document.getElementById('lista-tareas');
    const msgVacio = document.getElementById('msg-sin-tareas');

    if (listaTareas.length === 0) {
        msgVacio.style.display = 'block';
        return;
    }

    msgVacio.style.display = 'none';

    // Reconstruir tabla
    contenedor.innerHTML = `
        <div class="table-responsive">
            <table class="table table-dark table-hover text-center align-middle">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Operario</th>
                        <th>Tarea</th>
                        <th>Línea</th>
                        <th>Inicio</th>
                        <th>Límite</th>
                        <th>Prioridad</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${listaTareas.map((t, i) => `
                        <tr>
                            <td><small class="text-secondary">#${i + 1}</small></td>
                            <td>${t.operario}</td>
                            <td class="text-start">${t.tarea}
                                ${t.obs ? `<br><small class="text-secondary">${t.obs}</small>` : ''}
                            </td>
                            <td><small>${t.linea}</small></td>
                            <td><small>${t.fechaIni}</small></td>
                            <td><small>${t.fechaFin}</small></td>
                            <td>${badgePrioridad(t.prioridad)}</td>
                            <td>
                                <select class="form-select form-select-sm bg-dark text-light border-secondary"
                                    onchange="cambiarEstadoTarea(${i}, this.value)">
                                    <option ${t.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                                    <option ${t.estado === 'En proceso' ? 'selected' : ''}>En proceso</option>
                                    <option ${t.estado === 'Completada' ? 'selected' : ''}>Completada</option>
                                </select>
                            </td>
                            <td>
                                <button class="btn btn-sm btn-outline-danger" onclick="eliminarTarea(${i})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function badgePrioridad(p) {
    const mapa = {
        'Baja': 'secondary',
        'Media': 'info',
        'Alta': 'warning',
        'Urgente': 'danger'
    };
    return `<span class="badge bg-${mapa[p] || 'secondary'}">${p}</span>`;
}

function cambiarEstadoTarea(index, nuevoEstado) {
    listaTareas[index].estado = nuevoEstado;
    agregarNotificacion(
        `Tarea "${listaTareas[index].tarea}" → ${nuevoEstado}`,
        'fa-clipboard-check',
        'info'
    );
    renderizarTareas();
}

function eliminarTarea(index) {
    Swal.fire({
        title: '¿Eliminar tarea?',
        text: listaTareas[index].tarea,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        background: '#EEF8F5',
        color: '#2C3333',
        confirmButtonColor: '#c85a5a',
        cancelButtonColor: '#4a6370'
    }).then(r => {
        if (r.isConfirmed) {
            agregarNotificacion(
                `Tarea eliminada: ${listaTareas[index].tarea}`,
                'fa-trash',
                'danger'
            );
            listaTareas.splice(index, 1);
            renderizarTareas();
        }
    });
}

/* ===========================
   CLIENTES
=========================== */

let listaOrdenes = [];

async function formularioCliente() {

    const { value } = await darkModeSwal.fire({

        title: "Crear Nueva Orden",
        width: 580,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Crear Orden",

        html: `
            <div style="text-align:left; display:flex; flex-direction:column; gap:12px;">
                <div style="display:flex; gap:10px;">
                    <div style="flex:1;">
                        <label style="color:#aaa; font-size:13px;">Nombre del cliente</label>
                        <input id="sw-cli-nombre" class="swal2-input" style="margin:4px 0 0; width:100%;"
                            placeholder="Ej: Colegio Andino">
                    </div>
                    <div style="flex:1;">
                        <label style="color:#aaa; font-size:13px;">NIT / Documento</label>
                        <input id="sw-cli-nit" class="swal2-input" style="margin:4px 0 0; width:100%;"
                            placeholder="Ej: 900123456-1">
                    </div>
                </div>
                <div style="display:flex; gap:10px;">
                    <div style="flex:1;">
                        <label style="color:#aaa; font-size:13px;">Teléfono de contacto</label>
                        <input id="sw-cli-tel" type="tel" class="swal2-input" style="margin:4px 0 0; width:100%;"
                            placeholder="3001234567">
                    </div>
                    <div style="flex:1;">
                        <label style="color:#aaa; font-size:13px;">Correo electrónico</label>
                        <input id="sw-cli-email" type="email" class="swal2-input" style="margin:4px 0 0; width:100%;"
                            placeholder="cliente@correo.com">
                    </div>
                </div>
                <div>
                    <label style="color:#aaa; font-size:13px;">Producto solicitado</label>
                    <select id="sw-cli-producto" class="swal2-input" style="margin:4px 0 0; width:100%;">
                        <option value="">— Tipo de prenda —</option>
                        <option>Uniformes escolares</option>
                        <option>Dotación empresarial</option>
                        <option>Ropa deportiva</option>
                        <option>Camisetas personalizadas</option>
                        <option>Otro</option>
                    </select>
                </div>
                <div style="display:flex; gap:10px;">
                    <div style="flex:1;">
                        <label style="color:#aaa; font-size:13px;">Cantidad de unidades</label>
                        <input id="sw-cli-cantidad" type="number" min="1" class="swal2-input"
                            style="margin:4px 0 0; width:100%;" placeholder="0">
                    </div>
                    <div style="flex:1;">
                        <label style="color:#aaa; font-size:13px;">Fecha de entrega</label>
                        <input id="sw-cli-fecha" type="date" class="swal2-input" style="margin:4px 0 0; width:100%;">
                    </div>
                </div>
                <div>
                    <label style="color:#aaa; font-size:13px;">Estado de pago</label>
                    <select id="sw-cli-pago" class="swal2-input" style="margin:4px 0 0; width:100%;">
                        <option>Pendiente</option>
                        <option>Anticipo pagado</option>
                        <option>Pagado completo</option>
                    </select>
                </div>
                <div>
                    <label style="color:#aaa; font-size:13px;">Especificaciones / Diseño</label>
                    <textarea id="sw-cli-specs" class="swal2-textarea"
                        style="margin:4px 0 0; width:100%; resize:none;"
                        placeholder="Color, tallas, bordado, estampado, logo..."></textarea>
                </div>
            </div>
        `,

        preConfirm: () => {
            const nombre = document.getElementById('sw-cli-nombre').value.trim();
            const nit = document.getElementById('sw-cli-nit').value.trim();
            const tel = document.getElementById('sw-cli-tel').value.trim();
            const email = document.getElementById('sw-cli-email').value.trim();
            const producto = document.getElementById('sw-cli-producto').value;
            const cantidad = document.getElementById('sw-cli-cantidad').value;
            const fecha = document.getElementById('sw-cli-fecha').value;
            const pago = document.getElementById('sw-cli-pago').value;
            const specs = document.getElementById('sw-cli-specs').value.trim();

            if (!nombre || !producto || !cantidad || !fecha) {
                Swal.showValidationMessage('Completa al menos: nombre, producto, cantidad y fecha.');
                return false;
            }
            return { nombre, nit, tel, email, producto, cantidad, fecha, pago, specs };
        }
    });

    if (value) {

        // Guardar en el array
        listaOrdenes.push({ ...value, id: Date.now(), estado: 'En proceso' });

        // Renderizar en la sección
        renderizarOrdenes();

        agregarNotificacion(
            `Nueva orden: ${value.cantidad} ${value.producto} para ${value.nombre}`,
            "fa-file-signature",
            "info"
        );
    }
}

function renderizarOrdenes() {

    const contenedor = document.getElementById('lista-ordenes');
    const msgVacio = document.getElementById('msg-sin-ordenes');

    if (listaOrdenes.length === 0) {
        msgVacio.style.display = 'block';
        return;
    }

    msgVacio.style.display = 'none';

    contenedor.innerHTML = `
        <div class="table-responsive">
            <table class="table table-dark table-hover text-center align-middle">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>NIT</th>
                        <th>Producto</th>
                        <th>Cant.</th>
                        <th>Entrega</th>
                        <th>Pago</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${listaOrdenes.map((o, i) => `
                        <tr>
                            <td><small class="text-secondary">#${i + 1}</small></td>
                            <td class="text-start">
                                ${o.nombre}
                                ${o.tel ? `<br><small class="text-secondary"><i class="fas fa-phone me-1"></i>${o.tel}</small>` : ''}
                                ${o.email ? `<br><small class="text-secondary"><i class="fas fa-envelope me-1"></i>${o.email}</small>` : ''}
                            </td>
                            <td><small class="text-secondary">${o.nit || '—'}</small></td>
                            <td class="text-start">
                                ${o.producto}
                                ${o.specs ? `<br><small class="text-secondary">${o.specs}</small>` : ''}
                            </td>
                            <td><span class="badge bg-secondary">${o.cantidad}</span></td>
                            <td><small>${o.fecha}</small></td>
                            <td>${badgePago(o.pago)}</td>
                            <td>
                                <select class="form-select form-select-sm bg-dark text-light border-secondary"
                                    onchange="cambiarEstadoOrden(${i}, this.value)">
                                    <option ${o.estado === 'En proceso' ? 'selected' : ''}>En proceso</option>
                                    <option ${o.estado === 'Completada' ? 'selected' : ''}>Completada</option>
                                    <option ${o.estado === 'Cancelada' ? 'selected' : ''}>Cancelada</option>
                                </select>
                            </td>
                            <td>
                                <button class="btn btn-sm btn-outline-danger" onclick="eliminarOrden(${i})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function badgePago(p) {
    const mapa = {
        'Pendiente': 'danger',
        'Anticipo pagado': 'warning',
        'Pagado completo': 'success'
    };
    return `<span class="badge bg-${mapa[p] || 'secondary'}">${p}</span>`;
}

function cambiarEstadoOrden(index, nuevoEstado) {
    listaOrdenes[index].estado = nuevoEstado;
    agregarNotificacion(
        `Orden de ${listaOrdenes[index].nombre} → ${nuevoEstado}`,
        'fa-file-signature',
        'info'
    );
    renderizarOrdenes();
}

function eliminarOrden(index) {
    Swal.fire({
        title: '¿Eliminar orden?',
        text: `${listaOrdenes[index].producto} — ${listaOrdenes[index].nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        background: '#EEF8F5',
        color: '#2C3333',
        confirmButtonColor: '#c85a5a',
        cancelButtonColor: '#4a6370'
    }).then(r => {
        if (r.isConfirmed) {
            agregarNotificacion(
                `Orden eliminada: ${listaOrdenes[index].nombre}`,
                'fa-trash',
                'danger'
            );
            listaOrdenes.splice(index, 1);
            renderizarOrdenes();
        }
    });
}

/* ===========================
   PROVEEDORES
=========================== */

async function formularioProveedor() {

    const { value } = await darkModeSwal.fire({

        title: "Solicitar Insumos",
        width: 560,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Enviar Solicitud",

        html: `
            <div style="text-align:left; display:flex; flex-direction:column; gap:12px;">

                <div>
                    <label style="color:#aaa; font-size:13px;">Proveedor</label>
                    <select id="sw-prov-nombre" class="swal2-input" style="margin:4px 0 0; width:100%;">
                        <option value="">— Seleccionar proveedor —</option>
                        <option>Textiles XYZ</option>
                        <option>Insumos La 12</option>
                        <option>Distribuidora Bogotá Telas</option>
                        <option>Otro</option>
                    </select>
                </div>

                <div style="display:flex; gap:10px;">
                    <div style="flex:1;">
                        <label style="color:#aaa; font-size:13px;">Material / Insumo</label>
                        <select id="sw-prov-material" class="swal2-input" style="margin:4px 0 0; width:100%;">
                            <option value="">— Tipo de material —</option>
                            <option>Tela Oxford Blanca</option>
                            <option>Tela Oxford Negra</option>
                            <option>Hilo de costura</option>
                            <option>Botones</option>
                            <option>Cremalleras</option>
                            <option>Elástico</option>
                            <option>Entretela</option>
                            <option>Otro</option>
                        </select>
                    </div>
                    <div style="flex:1;">
                        <label style="color:#aaa; font-size:13px;">Cantidad</label>
                        <input id="sw-prov-cantidad" type="number" min="1" class="swal2-input"
                            style="margin:4px 0 0; width:100%;" placeholder="0">
                    </div>
                </div>

                <div style="display:flex; gap:10px;">
                    <div style="flex:1;">
                        <label style="color:#aaa; font-size:13px;">Unidad de medida</label>
                        <select id="sw-prov-unidad" class="swal2-input" style="margin:4px 0 0; width:100%;">
                            <option>Metros</option>
                            <option>Kilos</option>
                            <option>Rollos</option>
                            <option>Unidades</option>
                            <option>Cajas</option>
                        </select>
                    </div>
                    <div style="flex:1;">
                        <label style="color:#aaa; font-size:13px;">Urgencia</label>
                        <select id="sw-prov-urgencia" class="swal2-input" style="margin:4px 0 0; width:100%;">
                            <option>Normal</option>
                            <option>Prioritario</option>
                            <option>Urgente</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label style="color:#aaa; font-size:13px;">Fecha requerida de entrega</label>
                    <input id="sw-prov-fecha" type="date" class="swal2-input" style="margin:4px 0 0; width:100%;">
                </div>

                <div>
                    <label style="color:#aaa; font-size:13px;">Motivo / Observaciones</label>
                    <textarea id="sw-prov-motivo" class="swal2-textarea"
                        style="margin:4px 0 0; width:100%; resize:none;"
                        placeholder="Ej: Stock crítico, pedido urgente para orden #204..."></textarea>
                </div>

            </div>
        `,

        preConfirm: () => {
            const proveedor = document.getElementById('sw-prov-nombre').value;
            const material = document.getElementById('sw-prov-material').value;
            const cantidad = document.getElementById('sw-prov-cantidad').value;
            const unidad = document.getElementById('sw-prov-unidad').value;
            const urgencia = document.getElementById('sw-prov-urgencia').value;
            const fecha = document.getElementById('sw-prov-fecha').value;
            const motivo = document.getElementById('sw-prov-motivo').value.trim();

            if (!proveedor || !material || !cantidad || !fecha) {
                Swal.showValidationMessage('Completa al menos: proveedor, material, cantidad y fecha.');
                return false;
            }

            return { proveedor, material, cantidad, unidad, urgencia, fecha, motivo };
        }

    });

    if (value) {
        agregarNotificacion(
            `Pedido: ${value.cantidad} ${value.unidad} de ${value.material} — ${value.urgencia}`,
            "fa-truck-loading",
            "warning"
        );
    }

}


/* ===========================
   INCIDENCIA
=========================== */

function resolverIncidencia() {

    document.getElementById(
        "incidenciaLinea3"
    ).innerHTML = `
 
                <div class="d-flex justify-content-between align-items-center">
                    <strong>Línea 3 (Corte)</strong>
                    <span class="badge bg-success">
                        Operativa
                    </span>
                </div>
 
                <small class="text-secondary">
                    Operario: Luis P.
                </small>
 
            `;

    agregarNotificacion(
        "Incidencia M04 resuelta",
        "fa-tools",
        "success"
    );

}

/* ===========================
   FIX: guardarPerfil() definida (antes llamada pero no existía)
=========================== */

function guardarPerfil() {

    darkModeSwal.fire({
        icon: "success",
        title: "Perfil actualizado",
        text: "Los cambios han sido guardados correctamente."
    });

    agregarNotificacion(
        "Perfil del administrador actualizado",
        "fa-user-check",
        "success"
    );

}

/* ===========================
   GRAFICA
=========================== */

// FIX: envuelto en DOMContentLoaded para garantizar que el canvas esté listo
document.addEventListener("DOMContentLoaded", () => {

    const ctx =
        document.getElementById(
            "graficaProduccion"
        );

    if (ctx) {

        new Chart(ctx, {

            type: "line",

            data: {

                labels: [
                    "Lun",
                    "Mar",
                    "Mié",
                    "Jue",
                    "Vie",
                    "Sáb"
                ],

                datasets: [{

                    label: "Producción",

                    data: [
                        120,
                        190,
                        150,
                        220,
                        180,
                        250
                    ],

                    borderColor: "#A5C9CA",

                    backgroundColor:
                        "rgba(165,201,202,0.12)",

                    fill: true,

                    tension: 0.4

                }]

            }

        });

    }

    renderizarTablaUsuarios();

});

