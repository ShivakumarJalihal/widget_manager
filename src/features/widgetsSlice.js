import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_KEY = 'dashboard_widgets_v1';

const defaultWidgets = [
  { id: 'w1', name: 'Cloud Accounts', text: 'Connected / Not Connected stats' },
  { id: 'w2', name: 'Cloud Account Risk', text: 'Risk donut with counts' },
  { id: 'w3', name: 'Top Namespaces', text: 'Top 5 namespace alerts' },
  { id: 'w4', name: 'Workload Alerts', text: 'Workload alerts graph' },
  { id: 'w5', name: 'Image Risk Assessment', text: 'Image vulnerabilities summary' }
];

const defaultCategories = {
  cspm: {
    id: 'cspm',
    title: 'CSPM Executive Dashboard',
    widgets: ['w1', 'w2']
  },
  cwpp: {
    id: 'cwpp',
    title: 'CWPP Dashboard',
    widgets: ['w3','w4']
  },
  registry: {
    id: 'registry',
    title: 'Registry Scan',
    widgets: ['w5']
  }
};

function loadFromLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function saveToLocal(state) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
  } catch (e) {}
}

const persisted = loadFromLocal();

const initialState = persisted || {
  widgets: defaultWidgets,
  categories: defaultCategories
};

const slice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget(state, action) {
      const id = uuidv4();
      const widget = { id, name: action.payload.name, text: action.payload.text };
      state.widgets.push(widget);
      if (action.payload.categoryId) {
        state.categories[action.payload.categoryId].widgets.push(id);
      }
      saveToLocal(state);
    },
    removeWidgetFromCategory(state, action) {
      const c = state.categories[action.payload.categoryId];
      if (!c) return;
      c.widgets = c.widgets.filter(w => w !== action.payload.widgetId);
      saveToLocal(state);
    },
    toggleWidgetInCategory(state, action) {
      const { widgetId, categoryId, add } = action.payload;
      const c = state.categories[categoryId];
      if (!c) return;
      if (add && !c.widgets.includes(widgetId)) c.widgets.push(widgetId);
      if (!add) c.widgets = c.widgets.filter(w => w !== widgetId);
      saveToLocal(state);
    },
    createCategory(state, action) {
      state.categories[action.payload.id] = { id: action.payload.id, title: action.payload.title, widgets: [] };
      saveToLocal(state);
    },
    deleteWidget(state, action) {
      const wid = action.payload;
      state.widgets = state.widgets.filter(w => w.id !== wid);
      for (const cid of Object.keys(state.categories)) {
        state.categories[cid].widgets = state.categories[cid].widgets.filter(x => x !== wid);
      }
      saveToLocal(state);
    }
  }
});

export const { addWidget, removeWidgetFromCategory, toggleWidgetInCategory, createCategory, deleteWidget } = slice.actions;
export default slice.reducer;
