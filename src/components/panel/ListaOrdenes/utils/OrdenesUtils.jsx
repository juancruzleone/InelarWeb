export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'ARS' }).format(amount);
}

export function getOrderStatus(status) {
  return status === 'enviado' ? 'Enviado' : 'No enviado';
}

export function filterOrders(orders, searchTerm, filterStatus) {
  return orders.filter(order => {
    const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.nombre.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = filterStatus === 'all' || order.estado === filterStatus;

    return matchesSearch && matchesStatus;
  });
}