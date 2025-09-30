import { NextRequest, NextResponse } from 'next/server';

// Mock data for demonstration - in a real app, this would come from a database
const mockRoleModules = {
  Admin: {
    role: 'Admin',
    modules: {
      clients: true,
      projects: true,
      tickets: true,
      invoices: true,
      estimates: true,
      events: true,
      messages: true,
      tasks: true,
      time_logs: true,
      contracts: true,
      notices: true,
      payments: true,
      orders: true,
      knowledge_base: true,
      employees: true,
      attendance: true,
      expenses: true,
      leaves: true,
      leads: true,
      holidays: true,
      products: true,
      reports: true,
      bank_account: true,
    },
    available_modules: [
      'clients', 'projects', 'tickets', 'invoices', 'estimates', 'events',
      'messages', 'tasks', 'time_logs', 'contracts', 'notices', 'payments',
      'orders', 'knowledge_base', 'employees', 'attendance', 'expenses',
      'leaves', 'leads', 'holidays', 'products', 'reports', 'bank_account'
    ]
  },
  Employee: {
    role: 'Employee',
    modules: {
      clients: false,
      projects: true,
      tickets: true,
      invoices: false,
      estimates: false,
      events: true,
      messages: true,
      tasks: true,
      time_logs: true,
      contracts: false,
      notices: true,
      payments: false,
      orders: false,
      knowledge_base: true,
      employees: false,
      attendance: true,
      expenses: true,
      leaves: true,
      leads: false,
      holidays: true,
      products: false,
      reports: false,
      bank_account: false,
    },
    available_modules: [
      'clients', 'projects', 'tickets', 'invoices', 'estimates', 'events',
      'messages', 'tasks', 'time_logs', 'contracts', 'notices', 'payments',
      'orders', 'knowledge_base', 'employees', 'attendance', 'expenses',
      'leaves', 'leads', 'holidays', 'products', 'reports', 'bank_account'
    ]
  },
  Client: {
    role: 'Client',
    modules: {
      clients: false,
      projects: true,
      tickets: true,
      invoices: true,
      estimates: true,
      events: false,
      messages: true,
      tasks: true,
      time_logs: false,
      contracts: true,
      notices: true,
      payments: true,
      orders: true,
      knowledge_base: true,
      employees: false,
      attendance: false,
      expenses: false,
      leaves: false,
      leads: false,
      holidays: false,
      products: true,
      reports: false,
      bank_account: false,
    },
    available_modules: [
      'clients', 'projects', 'tickets', 'invoices', 'estimates', 'events',
      'messages', 'tasks', 'time_logs', 'contracts', 'notices', 'payments',
      'orders', 'knowledge_base', 'employees', 'attendance', 'expenses',
      'leaves', 'leads', 'holidays', 'products', 'reports', 'bank_account'
    ]
  }
};

// GET handler - Fetch role modules
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');

    if (!role) {
      return NextResponse.json(
        { success: false, message: 'Role parameter is required' },
        { status: 400 }
      );
    }

    const roleData = mockRoleModules[role as keyof typeof mockRoleModules];
    
    if (!roleData) {
      return NextResponse.json(
        { success: false, message: 'Role not found' },
        { status: 404 }
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      data: roleData
    });

  } catch (error) {
    console.error('Error fetching role modules:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT handler - Update role modules
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { role, modules } = body;

    if (!role || !modules) {
      return NextResponse.json(
        { success: false, message: 'Role and modules are required' },
        { status: 400 }
      );
    }

    if (!mockRoleModules[role as keyof typeof mockRoleModules]) {
      return NextResponse.json(
        { success: false, message: 'Role not found' },
        { status: 404 }
      );
    }

    // Update the mock data (in a real app, this would update the database)
    mockRoleModules[role as keyof typeof mockRoleModules].modules = modules;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
      success: true,
      message: 'Module settings updated successfully',
      data: mockRoleModules[role as keyof typeof mockRoleModules]
    });

  } catch (error) {
    console.error('Error updating role modules:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}