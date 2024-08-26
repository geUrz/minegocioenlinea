import connection from "@/libs/db"

export default async function handler(req, res) {
    const { id, usuario_id, best } = req.query;

    if (req.method === 'GET') {
        // Caso para obtener negocios destacados
        if (best === 'true') {
            try {
                const [rows] = await connection.query('SELECT id, usuario_id, negocio, descripcion, categoriaone, categoriatwo, tel, whatsapp, facebook, email, web, ubicacion, mapa, best FROM negocios WHERE best = ?', ['true']);
                res.status(200).json(rows);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            return;
        }

        // Caso para obtener negocio por usuario_id
        if (usuario_id) {
            try {
                const [rows] = await connection.query('SELECT id, usuario_id, negocio, descripcion, categoriaone, categoriatwo, tel, whatsapp, facebook, email, web, ubicacion, mapa FROM negocios WHERE usuario_id = ?', [usuario_id]);
                if (rows.length === 0) {
                    return res.status(404).json({ error: 'Negocio no encontrado' });
                }
                res.status(200).json(rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            return;
        }

        // Caso para obtener todos los negocios
        try {
            const [rows] = await connection.query('SELECT id, usuario_id, negocio, descripcion, categoriaone, categoriatwo, tel, whatsapp, facebook, email, web, ubicacion, mapa, best FROM negocios');
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'POST') {
        try {
            const { usuario_id, negocio, descripcion, categoriaone, categoriatwo, tel, whatsapp, facebook, email, web, ubicacion, mapa, best } = req.body;
            if (!usuario_id || !negocio || !categoriaone) {
                return res.status(400).json({ error: 'Todos los datos son obligatorios' });
            }
            const [result] = await connection.query('INSERT INTO negocios (usuario_id, negocio, descripcion, categoriaone, categoriatwo, tel, whatsapp, facebook, email, web, ubicacion, mapa, best) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [usuario_id, negocio, descripcion, categoriaone, categoriatwo, tel, whatsapp, facebook, email, web, ubicacion, mapa, best]);
            const newClient = { id: result.insertId };
            res.status(201).json(newClient);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'PUT') {
        if (!id) {
            return res.status(400).json({ error: 'ID del negocio es obligatorio' });
        }
        const { negocio, descripcion, categoriaone, categoriatwo, tel, whatsapp, facebook, email, web, ubicacion, mapa, best } = req.body;
        if (!negocio || !categoriaone) {
            return res.status(400).json({ error: 'Todos los datos son obligatorios' });
        }
        try {
            const [result] = await connection.query('UPDATE negocios SET negocio = ?, descripcion = ?, categoriaone = ?, categoriatwo = ?, tel = ?, whatsapp = ?, facebook = ?, email = ?, web = ?, ubicacion = ?, mapa = ?, best = ? WHERE id = ?', [negocio, descripcion, categoriaone, categoriatwo, tel, whatsapp, facebook, email, web, ubicacion, mapa, best, id]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Negocio no encontrado' });
            }
            res.status(200).json({ message: 'Negocio actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'DELETE') {
        if (!id) {
            return res.status(400).json({ error: 'ID del negocio es obligatorio' });
        }
        try {
            // Eliminar el negocio por ID
            const [result] = await connection.query('DELETE FROM negocios WHERE id = ?', [id]);

            // Verificar si el negocio fue eliminado
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Negocio no encontrado' });
            }

            res.status(200).json({ message: 'Negocio eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
