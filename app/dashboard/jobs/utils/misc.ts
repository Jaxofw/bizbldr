export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'default'
    case 'in_progress':
      return 'default'
    case 'pending':
      return 'secondary'
    case 'cancelled':
      return 'destructive'
    default:
      return 'secondary'
  }
}

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'destructive'
    case 'high':
      return 'default'
    case 'medium':
      return 'outline'
    case 'low':
      return 'secondary'
    default:
      return 'secondary'
  }
}

export const formatDateToLocaleString = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}
