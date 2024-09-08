import connection from "@/libs/db";

export default async function handler(req, res) {
    const { id } = req.query;  // Obtener el ID del query string

    if (req.method === 'PUT') {
        const { best } = req.body;  // Obtener el valor de 'best' desde el cuerpo de la solicitud

        // Validar que se haya proporcionado el ID y el valor de 'best'
        if (!id || best === undefined) {
            return res.status(400).json({ error: 'ID del negocio y el valor de best son obligatorios' });
        }

        try {
            // Actualizar solo el campo 'best' en la base de datos
            const [result] = await connection.query(
                'UPDATE negocios SET best = ? WHERE id = ?',
                [best, id]
            );

            // Verificar si se realizó la actualización
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Negocio no encontrado para actualizar el campo best' });
            }

            // Responder que la actualización fue exitosa
            res.status(200).json({ message: 'El campo best fue actualizado correctamente' });
        } catch (error) {
            // Capturar cualquier error durante la actualización
            console.error('Error al actualizar el campo best:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        // Si el método no es PUT, devolver un error 405
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
