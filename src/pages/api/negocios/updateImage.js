import connection from "@/libs/db";  // Verifica que esta ruta sea correcta

// Función para actualizar solo la imagen de un negocio
async function updateImage(id, image) {
  if (!id || !image) {
    throw new Error("ID y la URL de la imagen son obligatorios");
  }

  try {
    const [result] = await connection.query(
      'UPDATE negocios SET image = ? WHERE id = ?',
      [image, id]
    );

    if (result.affectedRows === 0) {
      throw new Error("Negocio no encontrado para actualizar la imagen");
    }

    return { message: "Imagen actualizada correctamente" };
  } catch (error) {
    throw new Error(`Error al actualizar la imagen: ${error.message}`);
  }
}

// API Handler para manejar la solicitud PUT
export default async function handler(req, res) {
  const id = req.query.id;
  const { image } = req.body;

  if (!id || !image) {
    return res.status(400).json({ error: "ID y la URL de la imagen son obligatorios" });
  }

  if (req.method === 'PUT') {
    try {
      const result = await updateImage(id, image);
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error al actualizar la imagen:', error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
