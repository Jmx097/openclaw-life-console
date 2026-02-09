#!/usr/bin/env python3
"""
Relationship Graph Generator
Parses markdown relationship files and generates JSON for vis-network visualization
"""

import json
import re
import os
from datetime import datetime
from pathlib import Path

def parse_relationship_file(filepath):
    """Parse a relationship markdown file and extract graph data"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    nodes = []
    edges = []
    
    # Extract people (h4 headers with names)
    person_pattern = r'#### (.+?) - (.+)\n\*\*Relationship Health:\*\* (.+?) \(last contact: (.+?)\)\n\*\*Category:\*\* (.+)\n\*\*Source:\*\* (.+)'
    
    for match in re.finditer(person_pattern, content):
        name = match.group(1).strip()
        role = match.group(2).strip()
        health = match.group(3).strip()
        last_contact = match.group(4).strip()
        category = match.group(5).strip()
        source = match.group(6).strip()
        
        # Determine color based on health
        color = '#4CAF50'  # Green (strong)
        if 'Cooling' in health or 'At Risk' in health:
            color = '#FF9800'  # Orange
        if 'At Risk' in health:
            color = '#F44336'  # Red
        
        # Determine shape based on category
        shape = 'dot'
        if 'Investor' in category:
            shape = 'diamond'
        elif 'Client' in category:
            shape = 'square'
        elif 'Connector' in category:
            shape = 'triangle'
        
        nodes.append({
            'id': name.lower().replace(' ', '_'),
            'label': name,
            'title': f"{role}<br>Category: {category}<br>Health: {health}<br>Last contact: {last_contact}",
            'group': category,
            'color': color,
            'shape': shape,
            'role': role,
            'category': category,
            'health': health,
            'last_contact': last_contact,
            'source': source
        })
    
    # Extract connections between people
    connections_pattern = r'\*\*Connections:\*\*\n(.+?)(?=\n\*\*|$)'
    
    for match in re.finditer(connections_pattern, content, re.DOTALL):
        connections_text = match.group(1)
        # Find which person this belongs to (look back for the last h4)
        preceding = content[:match.start()]
        person_match = list(re.finditer(r'#### (.+?) - ', preceding))[-1] if re.finditer(r'#### (.+?) - ', preceding) else None
        
        if person_match:
            person_name = person_match.group(1).strip()
            person_id = person_name.lower().replace(' ', '_')
            
            # Extract connected people
            connected_pattern = r'- (?:Introduced by|Connected to):? (.+)'
            for conn_match in re.finditer(connected_pattern, connections_text):
                connected_names = conn_match.group(1).strip()
                # Handle multiple names
                for name in connected_names.split(','):
                    name = name.strip()
                    # Clean up common prefixes
                    if 'introduced by ' in name.lower():
                        name = name.lower().replace('introduced by ', '').strip()
                    
                    connected_id = name.lower().replace(' ', '_')
                    
                    edges.append({
                        'from': person_id,
                        'to': connected_id,
                        'label': 'connected',
                        'arrows': 'to'
                    })
    
    # Extract projects/deals and link to people
    project_pattern = r'### (.+?)\n\*\*Status:\*\* (.+?)\n\*\*Value:\*\* (.+?)\n\*\*Probability:\*\* (.+?)\n\*\*Last Activity:\*\* (.+?)\n\n\*\*Key People:\*\*\n(.+?)(?=\n\*\*|$)'
    
    for match in re.finditer(project_pattern, content, re.DOTALL):
        project_name = match.group(1).strip()
        status = match.group(2).strip()
        value = match.group(3).strip()
        probability = match.group(4).strip()
        key_people_text = match.group(6)
        
        # Add project as node
        project_id = project_name.lower().replace(' ', '_')
        nodes.append({
            'id': project_id,
            'label': project_name,
            'title': f"Status: {status}<br>Value: {value}<br>Probability: {probability}",
            'group': 'Project',
            'color': '#2196F3',  # Blue
            'shape': 'hexagon',
            'status': status,
            'value': value,
            'probability': probability
        })
        
        # Link people to project
        for line in key_people_text.split('\n'):
            if line.strip().startswith('- '):
                person_part = line.strip()[2:]
                # Extract name before parentheses
                name_match = re.match(r'(.+?)\s*\(', person_part)
                if name_match:
                    person_name = name_match.group(1).strip()
                    person_id = person_name.lower().replace(' ', '_')
                    
                    edges.append({
                        'from': person_id,
                        'to': project_id,
                        'label': 'involved in',
                        'arrows': 'to'
                    })
    
    return {'nodes': nodes, 'edges': edges}

def generate_graph_data():
    """Generate graph data from all relationship files"""
    
    tracking_dir = Path(__file__).parent.parent
    relationships_dir = tracking_dir / 'relationships'
    
    all_nodes = []
    all_edges = []
    
    if relationships_dir.exists():
        for md_file in relationships_dir.glob('*.md'):
            data = parse_relationship_file(md_file)
            all_nodes.extend(data['nodes'])
            all_edges.extend(data['edges'])
    
    # Remove duplicate nodes
    seen_ids = set()
    unique_nodes = []
    for node in all_nodes:
        if node['id'] not in seen_ids:
            seen_ids.add(node['id'])
            unique_nodes.append(node)
    
    # Remove duplicate edges
    seen_edges = set()
    unique_edges = []
    for edge in all_edges:
        edge_key = (edge['from'], edge['to'])
        if edge_key not in seen_edges:
            seen_edges.add(edge_key)
            unique_edges.append(edge)
    
    return {'nodes': unique_nodes, 'edges': unique_edges}

def main():
    """Generate graph data and save to JSON"""
    
    graph_data = generate_graph_data()
    
    # Add metadata
    output = {
        'generated_at': datetime.now().isoformat(),
        'node_count': len(graph_data['nodes']),
        'edge_count': len(graph_data['edges']),
        'graph': graph_data
    }
    
    # Save to visualization directory
    viz_dir = Path(__file__).parent
    viz_dir.mkdir(parents=True, exist_ok=True)
    
    output_file = viz_dir / 'graph-data.json'
    with open(output_file, 'w') as f:
        json.dump(output, f, indent=2)
    
    print(f"✅ Graph data generated: {output_file}")
    print(f"   Nodes: {output['node_count']}")
    print(f"   Edges: {output['edge_count']}")

if __name__ == '__main__':
    main()
