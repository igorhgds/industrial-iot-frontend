// Estados de Saúde dos Equipamentos (Plant Health)
export enum HealthStatus {
  OPERATIONAL = 'OPERATIONAL',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
  HEALTH = 'HEALTH',
  UNKNOWN = 'UNKNOWN',
}

// Gravidade e Status dos Alertas
export enum AlertSeverity {
  REGULAR = 'REGULAR',
  INFO = 'INFO',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
}

export enum AlertStatus {
  PENDING = 'PENDING',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  RESOLVED = 'RESOLVED',
}

// Ordens de Serviço (Manutenção)
export enum WorkOrderStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum WorkOrderPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

// Motor de Regras, Condições Lógicas e Automação
export enum LogicalOperator {
  AND = 'AND',
  OR = 'OR',
}

export enum ComparisonOperator {
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  EQUALS = 'EQUALS',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
}

export enum ActionType {
  TOGGLE_ACTUATOR = 'TOGGLE_ACTUATOR',
  TRIGGER_LIGHT_ALERT = 'TRIGGER_LIGHT_ALERT',
  SEND_EMAIL = 'SEND_EMAIL',
}

// Ativos da Planta: Equipamentos, Gateways, Sensores, Atuadores e Usuários
export enum EquipType {
  MOTOR = 'MOTOR',
  HVAC = 'HVAC',
  LIGHTING = 'LIGHTING',
  CONVEYOR = 'CONVEYOR',
  COMPRESSOR = 'COMPRESSOR',
}

export enum EquipStatus {
  ACTIVE = 'ACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  INACTIVE = 'INACTIVE',
}

export enum GatewayStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  MAINTENANCE = 'MAINTENANCE',
}

export enum SensorType {
  CURRENT = 'CURRENT',
  VOLTAGE = 'VOLTAGE',
  TEMPERATURE = 'TEMPERATURE',
  VIBRATION = 'VIBRATION',
  PRESSURE = 'PRESSURE',
}

export enum SensorStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  ERROR = 'ERROR',
}

export enum ActuatorType {
  RELAY = 'RELAY',
  VALVE = 'VALVE',
  MOTOR = 'MOTOR',
  HEATER = 'HEATER',
}

export enum ActuatorStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  ERROR = 'ERROR',
}

export enum UserRole {
  OPERATOR = 'OPERATOR',
  TECHNICIAN = 'TECHNICIAN',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}
